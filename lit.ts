import LitJsSdk from 'lit-js-sdk';


const client = new LitJsSdk.LitNodeClient()
const chain = 'mumbai'

class Lit {
  private litNodeClient

  async connect() {
    await client.connect()
    this.litNodeClient = client
  }

  async encrypt(song: File) {
    if (!this.litNodeClient) {
      await this.connect()
    }

    const authSig = await LitJsSdk.checkAndSignAuthMessage({ chain })
    
    const { encryptedFile, symmetricKey } = await LitJsSdk.encryptFile(song);


    const accessControlConditions = [
      {
          contractAddress: '',
          standardContractType: '',
          chain: chain,
          method: 'eth_getBalance',
          parameters: [':userAddress', 'latest'],
          returnValueTest: {
          comparator: '>=',
          value: '0',  // 0 ETH, so anyone can open
          },
      },
  ]; 
    const encryptedSymmetricKey = await this.litNodeClient.saveEncryptionKey({
      accessControlConditions,
      symmetricKey,
      authSig,
      chain,
    })
    
    return {
      encryptedFile,
      encryptedSymmetricKey: LitJsSdk.uint8arrayToString(encryptedSymmetricKey, "base16")
    }
  }
}


export default new Lit()
