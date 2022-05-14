import { ethers } from 'hardhat'
//import { tokenName, tokenSymbol, initialSupply, decimals } from '../token-info'

const tokenArgs = require('../token-info')
const [
  tokenName,
  tokenSymbol,
  initialSupply,
  decimals,
  //tokenAddress
] = tokenArgs

async function main() {
  const Token = await ethers.getContractFactory('Token')
  const token = await Token.deploy(
    tokenName,
    tokenSymbol,
    ethers.utils.parseUnits(`${initialSupply}`, decimals),
    decimals
  )

  await token.deployed()

  console.log('Token deployed to:', token.address)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
