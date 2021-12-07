import { utils } from "ethers";

export const calculateApr = async (url, csv, blockTime, liquidityValue, allocPoint, totalAllocation) => {
  // const url = chainId === Number(process.env.REACT_APP_YDFAI_ALLOWED_NETWORK) ? process.env.REACT_APP_COINGECKO_API_YFDAI : process.env.REACT_APP_COINGECKO_API_SSGT;
  const response = await fetch(url).catch((e) => {});
  const jsonData = await response.json();
  const priceUsd = jsonData[csv].usd;
  const tokenBlockTime = blockTime;
  const tokenPerBlock = 0.666;
  const blocksPerYear = (60 / tokenBlockTime) * 60 * 24 * 365;
  const tokenPerYear = tokenPerBlock * blocksPerYear;
  if (liquidityValue !== 0 && allocPoint && allocPoint[0] && totalAllocation && totalAllocation[0] && priceUsd) {
    const poolWeight = allocPoint[0] / totalAllocation[0];
    const yearlyRewardAllocation = tokenPerYear * poolWeight;
    const rewardsApr = ((parseFloat(yearlyRewardAllocation) * parseFloat(priceUsd)) / parseFloat(liquidityValue)) * 100;
    if (rewardsApr !== Infinity) {
      return rewardsApr;
    }
  }
};

export const calculateLiquidity = async (token0, token1, coingeckoData, liquidityToken0, liquidityToken1) => {
  let token0Address = token0 && token0[0];
  let token1Address = token1 && token1[0];
  let usdValueToken0, usdValueToken1, usdRateForToken0, usdRateForToken1;

  let urlForToken0 = coingeckoData.filter((item) => {
    if (token0Address.toString().toLowerCase() === item.tokenProd.toString().toLowerCase()) {
      return item.tokenUrl ? item.tokenUrl : null;
    }
  });

  let urlForToken1 = coingeckoData.filter((item) => {
    if (token1Address.toString().toLowerCase() === item.tokenProd.toString().toLowerCase()) {
      return item.tokenUrl ? item.tokenUrl : null;
    }
  });

  if (urlForToken0.length > 0 && liquidityToken0 && liquidityToken0.length > 0 && liquidityToken0[0] && liquidityToken0[0]._hex) {
    usdValueToken0 = await fetch(urlForToken0[0].tokenUrl).catch((e) => {});
    let response = await usdValueToken0.json();
    if (urlForToken0[0].name.toString().toLowerCase() === "tether" || urlForToken0[0].name.toString().toLowerCase() === "usd-coin") {
      usdRateForToken0 = response[urlForToken0[0].name].usd * utils.formatUnits(liquidityToken0[0]._hex, 6);
    } /* else if (urlForToken0[0].name.toString() === "ssgtx") {
          setUsdRateForToken0((response["safeswap-token"].usd * utils.formatEther(liquidityToken0[0]._hex)));
        } */ else {
      usdRateForToken0 = response[urlForToken0[0].name].usd * utils.formatEther(liquidityToken0[0]._hex);
    }
  }
  //USE BELOW CODE FOR DEVELOPMENT TESTING
  else if(coingeckoData.filter((item) => {return item.value}) && liquidityToken0 && liquidityToken0[0] && liquidityToken0[0]._hex){
      let defaultValue = coingeckoData.filter((item) => {return item.value})
      usdValueToken0 = defaultValue[0].value * utils.formatEther(liquidityToken0[0]._hex)
      usdRateForToken0 = usdValueToken0
  }
  else {
    usdRateForToken0 = 0;
  }

  if (urlForToken1.length > 0 && liquidityToken1 && liquidityToken1.length > 0 && liquidityToken1[0] && liquidityToken1[0]._hex) {
    usdValueToken1 = await fetch(urlForToken1[0].tokenUrl).catch((e) => {});
    let response = await usdValueToken1.json();
    if (urlForToken1[0].name.toString().toLowerCase() === "tether" || urlForToken1[0].name.toString().toLowerCase() === "usd-coin") {
      usdRateForToken1 = response[urlForToken1[0].name].usd * utils.formatUnits(liquidityToken1[0]._hex, 6);
    } /* else if (urlForToken1[0].name.toString() === "ssgtx") {
          setUsdRateForToken1((response["safeswap-token"].usd * utils.formatEther(liquidityToken1[0]._hex)));
        } */ else {
      usdRateForToken1 = response[urlForToken1[0].name].usd * utils.formatEther(liquidityToken1[0]._hex);
    }
  }
  //BELOW CODE FOR DEVELOPMENT TESTING
   else if(coingeckoData.filter((item) => {return item.value}) && liquidityToken1 && liquidityToken1.length>0 && liquidityToken1[0] && liquidityToken1[0]._hex){
      let defaultValue = coingeckoData.filter((item) => {return item.value})
      usdValueToken1 = defaultValue[0].value * utils.formatEther(liquidityToken1[0]._hex)
      usdRateForToken1 = usdValueToken1
  }
  else {
    usdRateForToken1 = 0;
  }
  return { token0: usdRateForToken0, token1: usdRateForToken1 };
  // setLiquidityValue((parseFloat(usdRateForToken0) + parseFloat(usdRateForToken1)))
};
