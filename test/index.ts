import { expect } from 'chai'
import { ethers } from 'hardhat'
import { Contract } from 'ethers'
import { Signer } from 'ethers'

describe('SkxToken', function () {
  let Token
  let newToken: Contract
  let owner: any
  let addr2: any
  let addr3: any
  let decimals = 6

  beforeEach(async function () {
    Token = await ethers.getContractFactory('Token')
    ;[owner, addr2, addr3] = await ethers.getSigners()
    newToken = await Token.deploy(
      'SkxToken',
      'SKX',
      ethers.utils.parseUnits('1000', decimals),
      decimals
    )
    await newToken.deployed()
  })

  it('Should return name from getter getName', async function () {
    expect(await newToken.name()).to.equal('SkxToken')
  })

  it('Should return symbol from getter getSymbol', async function () {
    expect(await newToken.symbol()).to.equal('SKX')
  })

  it('Should return decimals from getter getDecimals', async function () {
    expect(await newToken.decimals()).to.equal(decimals)
  })

  it('Should return total supply of tokens from getter totalSupply', async function () {
    expect(await newToken.totalSupply()).to.equal(
      ethers.utils.parseUnits('1000', decimals)
    )
  })

  it('Checking transfer and balanceOf tokens', async function () {
    await newToken.transfer(
      addr2.address,
      ethers.utils.parseUnits('100', decimals)
    )
    expect(await newToken.balanceOf(owner.address)).to.equal(900000000)
    expect(await newToken.balanceOf(addr2.address)).to.equal(100000000)
  })

  it('checking approve and allowence', async function () {
    await newToken.approve(addr2.address, 100000000)
    const allowanceValue = await newToken.allowance(
      owner.address,
      addr2.address
    )
    expect(await allowanceValue).to.equal(100000000)
  })

  it('checking transferFrom', async function () {
    await newToken.approve(addr2.address, 100000000)
    await newToken
      .connect(addr2)
      .transferFrom(owner.address, addr3.address, 100000000)
    expect(await newToken.allowance(owner.address, addr2.address)).to.equal(0)
    expect(await newToken.balanceOf(addr3.address)).to.equal(100000000)
  })

  it('to mint tokens', async function () {
    await newToken.mint(addr3.address, 150000000)
    expect(await newToken.totalSupply()).to.equal(1150000000)
    expect(await newToken.balanceOf(addr3.address)).to.equal(150000000)
  })

  it('to burn tokens', async function () {
    await newToken.burn(owner.address, 200000000)
    expect(await newToken.totalSupply()).to.equal(800000000)
    expect(await newToken.balanceOf(owner.address)).to.equal(800000000)
  })

  it('Revert if not enough tokens', async function () {
    await expect(
      newToken.transfer(addr2.address, 1100000000)
    ).to.be.revertedWith('not enough token!')
  })

  it('Revert if not enough tokens', async function () {
    await newToken.transfer(addr2.address, 100000000)
    await expect(
      newToken.transferFrom(addr2.address, addr3.address, 100000000)
    ).to.be.revertedWith('amount is not allowed!')
  })

  it('Revert if not enough tokens for transferFrom function', async function () {
    await newToken.approve(addr2.address, 100000000)
    await expect(
      newToken
        .connect(addr2)
        .transferFrom(owner.address, addr3.address, 1100000000)
    ).to.be.revertedWith('not enough token!')
  })

  it('Revert if not enough tokens for burn', async function () {
    await expect(newToken.burn(owner.address, 1200000000)).to.be.revertedWith(
      'not enough token!'
    )
  })

  it('Change an owner', async function () {
    await newToken.changeOwner(addr2.address)
    expect(await newToken.owner()).to.equal(addr2.address)
  })
})
