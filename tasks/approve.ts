import { HardhatUserConfig, task } from 'hardhat/config'
import '@nomiclabs/hardhat-waffle'
import '@nomiclabs/hardhat-ethers'
import { tokenAddress } from '../token-info'

task('approve', 'approve the allowance to transfer token')
  .addOptionalParam('addressTo', 'address to allow transfer token')
  .addOptionalParam('value', 'amount of token to transfer')
  .setAction(async (taskArgs, hre) => {
    const token = await hre.ethers.getContractAt('Token', tokenAddress)
    const tx = await token.approve(taskArgs.addressTo, taskArgs.value)
    await tx.wait()
    console.log(`${taskArgs.value} approved to transfer ${taskArgs.addressTo}`)
  })
