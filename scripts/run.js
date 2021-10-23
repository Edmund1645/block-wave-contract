async function main() {
  const [owner, randoPerson] = await hre.ethers.getSigners();
  const waveContractFactory = await hre.ethers.getContractFactory('WavePortal');
  const waveContract = await waveContractFactory.deploy({
    value: hre.ethers.utils.parseEther('0.1'),
  });
  await waveContract.deployed();
  console.log('Contract deployed to:', waveContract.address);
  console.log('Contract deployed by:', owner.address);

  // get contract balance

  let contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
  console.log('contract Balance;', hre.ethers.utils.formatEther(contractBalance));

  let waveCount;
  waveCount = await waveContract.getTotalWaves();

  // sending some waves
  let waveTxn = await waveContract.wave('A nice wave'); // wait for transaction to be requested
  await waveTxn.wait(); // wait for transaction to be mined

  waveCount = await waveContract.getTotalWaves();

  contractBalance = await hre.ethers.provider.getBalance(waveContract.address);
  console.log('contract balance:', hre.ethers.utils.formatEther(contractBalance));

  // waveTxn = await waveContract.connect(randoPerson).wave('Another nice wave'); // connect to a random person and sign using their address
  // await waveTxn.wait(); // wait for transaction to be mined

  const allWaves = await waveContract.getAllWaves();
  console.log(allWaves);
}

(async () => {
  try {
    await main();
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
})();
