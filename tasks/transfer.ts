import { task } from 'hardhat/config'
import '@nomiclabs/hardhat-waffle'
import { tokenAddress } from '../token-info'

task('transfer', 'transfer your tokens to address')
  .addOptionalParam('addressTo', 'transfer token to address')
  .addOptionalParam('amount', 'amount of token to transfer')
  .setAction(async (taskArgs, hre) => {
    const Token = await hre.ethers.getContractAt('Token', tokenAddress)
    const tx = await Token.transfer(taskArgs.addressTo, taskArgs.amount)
    await tx.wait()
    console.log(`${taskArgs.amount} transfered to ${taskArgs.addressTo}`)
  })
