import { task } from 'hardhat/config'
import '@nomiclabs/hardhat-waffle'
import { tokenAddress } from '../token-info'

task('transferFrom', 'transfer allowed tokens form address to address')
  .addOptionalParam('addressFrom', 'transfer allowed tokens from address')
  .addOptionalParam('addressTo', 'transfer token to address')
  .addOptionalParam('amount', 'amount of token to transfer')
  .setAction(async (taskArgs, hre) => {
    const Token = await hre.ethers.getContractAt('Token', tokenAddress)
    const tx = await Token.transferFrom(
      taskArgs.addressFrom,
      taskArgs.addressTo,
      taskArgs.amount
    )
    await tx.wait()
    console.log(
      `${taskArgs.amount} transfered from ${taskArgs.addressFrom} to ${taskArgs.addressTo}`
    )
  })
