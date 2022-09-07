import React, {useCallback, useEffect, useState} from "react";
import {Box, Button, Grid, Typography} from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import BackgroundImage from "components/BackgroundImage";
import RawImage from "components/RawImage";
import logo from "assets/img/bg.jpg";
import lemur0 from "assets/img/lemurs/0.png";
import lemur1 from "assets/img/lemurs/1.png";
import lemur2 from "assets/img/lemurs/2.png";
import lemur3 from "assets/img/lemurs/3.png";
import lemur4 from "assets/img/lemurs/4.png";
import lemur5 from "assets/img/lemurs/5.png";
import roadmap from "assets/img/roadmaphalf.png";
import useEagerConnect from "utils/hooks/useEagerConnect";
import {useWeb3React} from "@web3-react/core";
import useInactiveListener from "utils/hooks/useInactiveListener";
import {injected} from "libs/web3-connectors";
import getEllipsis from "utils/helpers/getEllipsis";

import LuckyLemurs from "artifacts/contracts/LuckyLemurs.sol/LuckyLemurs.json";
import {ethers} from "ethers";
import minty from "minty-deployment.json";

export default function Home() {
  const [activatingConnector, setActivatingConnector] = useState();
  const [quantity, setQuantity] = useState(0);
  const [max, setMax] = useState(0);
  const [total, setTotal] = useState(0);
  const [saleStarted, setSaleStarted] = useState(false);
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  const BorderLinearProgress = withStyles((theme) => ({
    root: {
      height: 10,
      borderRadius: 5,
    },
    colorPrimary: {
      backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
      borderRadius: 5,
      backgroundColor: '#10B981',
    },
  }))(LinearProgress);

  const {account, connector, activate, deactivate, active, error, library} =
      useWeb3React();

  const triedEager = useEagerConnect();
  useInactiveListener(!triedEager || !!activatingConnector);

  const walletHandler = () => {
    if (active || error) {
      deactivate();
      return;
    }
    setActivatingConnector(injected);
    activate(injected);
  };

  const mintHandler = useCallback(async () => {
    const signer = library.getSigner();
    const contract = new ethers.Contract(
        minty.contract.address,
        LuckyLemurs.abi,
        signer
    );
    const price = await contract.getPrice();
    await contract.mint(quantity, {value: price.mul(quantity)});
  }, [library, quantity]);
  

  useEffect(() => {
    async function initData() {
      if (active) {
        const signer = library.getSigner();
        const contract = new ethers.Contract(
            minty.contract.address,
            LuckyLemurs.abi,
            signer
        );
        const maxSupply = await contract.maxSupply();
        setMax(maxSupply.toNumber());
        const totalSupply = await contract.totalSupply();
        setTotal(totalSupply.toNumber());
        setSaleStarted(await contract.saleStarted());
      }
    }

    initData();
  }, [active, library]);

  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  return (
      <>
        <BackgroundImage src={logo}>
          <Typography
              variant="body1"
              className="absolute px-4 py-1.5 bg-black rounded-xl absolute top-24"
              onClick={walletHandler}
              style={{cursor: "pointer"}}
          >
            {(account && getEllipsis(account)) || "Wallet not connected."}
          </Typography>
          <Box className={click ? "hidden" : "block" }>
            <Box className="bg-white m-auto bg-opacity-60 rounded-3xl">
              <Box className="flex flex-col items-center p-10">
                <span className="Poppitandfinchsans md:text-6xl text-3xl text-white">
                  {max === total ? "SOLD OUT" : total + " / " + max}
                </span>
                {/* <a href="https://opensea.io/collection/krazykoalas" className="w-3/5">
                  <Box className="mt-5 bg-green-500 text-white px-15 py-4 rounded-xl text-center">
                    <span className="Poppitandfinchsans drop-shadow-xl md:text-3xl text-xl">
                      MINT
                    </span>
                  </Box>
                </a> */}
                <Button className="mint-button w-3/5 text-white px-10 py-4 rounded-xl bg-green-500 mt-5 drop-shadow-xl text-xl md:text-3xl" onClick={handleClick}>                  
                  MINT
                </Button>
              </Box>
            </Box>
          </Box>
          <Box className={click ? "block flex w-11/12 md:w-7/12" : "hidden" }>
            <Box className="flex bg-white m-auto bg-opacity-60 rounded-3xl">
              <Grid container spacing={3} className="p-5 md:p-10">
                <Grid item xs={12} md={6}>
                  <RawImage
                    src={lemur0}
                    alt="icon"
                    className="p-2 mx-auto w-5/12 md:w-11/12"
                  />
                </Grid>
                <Grid item xs={12} md={6} style={{margin: 'auto'}}>
                  <Box className="flex my-3">
                    <Typography
                        variant="h5"
                        className="Poppitandfinchsans text-black"
                    >
                      TOTAL MINTED:
                    </Typography>
                    <Typography
                        variant="h5"
                        className="Poppitandfinchsans text-black"
                    >
                      &nbsp; XXXXXXX
                    </Typography>
                  </Box>
                  <Box className="flex my-3">
                    <Typography
                        variant="h5"
                        className="Poppitandfinchsans text-black"
                    >
                      AMOUNT MINTED:
                    </Typography>
                    <Typography
                        variant="h5"
                        className="Poppitandfinchsans text-black"
                    >
                      &nbsp; XXXXXXX
                    </Typography>
                  </Box>
                  <Box className="flex my-3">
                    <Typography
                        variant="h5"
                        className="Poppitandfinchsans text-black"
                    >
                      Mint Price:
                    </Typography>
                    <Typography
                        variant="h5"
                        className="Poppitandfinchsans text-black"
                    >
                      &nbsp; 100ETH
                    </Typography>
                  </Box>
                  <BorderLinearProgress className="my-7" variant="determinate" value={50} />
                  <Box className="flex mt-10 justify-around">
                    <Typography
                        variant="h5"
                        className="Poppitandfinchsans text-black flex items-center"
                    >
                      AMOUNT TO MINT:
                    </Typography>                    
                    <input
                      type="number"                        
                      min="1"                      
                      max="10000"
                      className="Poppitandfinchsans text-2xl w-1/4 inline bg-grey-lighter py-2 px-2 mx-2 rounded text-black font-bold text-center"
                      onChange={(e) => setQuantity(parseInt(e.target.value))}
                    />
                  </Box>
                  <Button className="mint-button w-4/5 text-white px-10 py-4 rounded-xl bg-green-500 mt-5 drop-shadow-xl text-xl md:text-3xl" style={{display: 'flex'}} onClick={handleClick}>                  
                    CONNECT WALLET
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </BackgroundImage>
        {active && !error && saleStarted ? (
          <Grid
              container
              spacing={3}
              className="justify-center xl:pt-16 pt-10 xl:pb-10 pb-5"
              style={{background: "#91A1A7", width: '100%'}}
          >
            <Grid item xs={12} md={7} className="text-center md:w-full">
              <Typography
                  variant="h2"
                  className="Poppitandfinchsans pb-2 text-white"
              >
                MINT YOUR LUCKY LEMURS
              </Typography>
              <Grid container spacing={1} className="py-5">
                <Grid item xs={12} md={6}>
                  <input
                      type="number"
                      placeholder="Quantity"
                      min="1"
                      max="30"
                      className="w-4/5 Poppitandfinchsans text-2xl w-64 inline bg-grey-lighter py-2 pl-5 rounded text-black font-bold text-center"
                      onChange={(e) => setQuantity(parseInt(e.target.value))}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Button
                      className="w-4/5 Poppitandfinchsans text-2xl border-6 shadow text-white main-button"
                      onClick={mintHandler}
                      style={{padding: '13px 8px', borderRadius: '0.4rem'}}
                  >
                    MINT
                  </Button>
                </Grid>
              </Grid>
              <Typography
                  variant="h6"
                  className="Poppitandfinchsans py-1 text-white"
              >
                You cannot mint more than 30 Tokens at once!
              </Typography>
            </Grid>
          </Grid>
        ) : (
            ""
        )}
        <Grid container className="justify-center bg-white" style={{width: '100%'}}>
          <Grid item xs={12} md={10}>
            <Grid container spacing={3}>
              <Grid
                  item
                  xs={12}
                  md={8}
                  className="text-center md:text-left"
                  style={{margin: "auto"}}
              >
                <Typography
                    variant="h2"
                    className="Poppitandfinchsans pb-2 text-black block"
                >
                  Lucky Lemurs
                </Typography>
                <Typography
                    variant="h6"
                    className="Poppitandfinchsans py-1 text-black block"
                >
                  The Lucky Lemurs are a tribe of 9,999 Ring-Tailed Lemurs
                  programmatically generated from over 210 traits. Once only found
                  deep in the jungles of Madagascar, the Lemurs have recently
                  relocated to the Ethereum blockchain to build an exclusive
                  community of like-minded Lucky Lemurs.
                </Typography>
              </Grid>
              <Grid item xs={12} md={4} className="p-2">
                <RawImage
                    src={lemur0}
                    alt="icon"
                    className="p-2 mx-auto w-11/12"
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid
            container            
            className="justify-center p-2"
            style={{background: "#91A1A7", width: '100%'}}
        >
          <Grid item xs={12} md={6} className="text-center">
            <Typography
                variant="h2"
                className="Poppitandfinchsans pb-2 text-black block"
            >
              Mint
            </Typography>
            <Typography
                variant="h6"
                className="Poppitandfinchsans py-1 text-white block"
            >
              The Mint will be done in two parts with measures put in place to
              ensure the lowest possible gas prices and prevent a gas war. The
              discounted presale will be up to 2000 lemurs to the first 500
              Discord members to reach 5 invites. The remaining lemurs will be
              available to mint the following day. Mint to go live between
              September 13-20th. (Final date and time TBA)
            </Typography>
          </Grid>
        </Grid>
        <Grid
            container            
            className="justify-center py-10"
            style={{background: "#515D61", width: '100%'}}
        >
          <Grid item xs={12} md={6}>
            <Grid container spacing={3}>
              <Grid item xs={4} md={4}>
                <RawImage
                    src={lemur1}
                    alt="icon"
                    className="p-2 mx-auto w-11/12"
                />
              </Grid>
              <Grid item xs={4} md={4}>
                <RawImage
                    src={lemur2}
                    alt="icon"
                    className="p-2 mx-auto w-11/12"
                />
              </Grid>
              <Grid item xs={4} md={4}>
                <RawImage
                    src={lemur3}
                    alt="icon"
                    className="p-2 mx-auto w-11/12"
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <RawImage src={roadmap} alt="icon" style={{width: '100%'}} />
        <Grid
            container            
            className="justify-center py-4"
            style={{background: "#91A1A7", width: '100%'}}
        >
          <Grid item xs={12} md={4} className="text-center">
            <Typography
                variant="h2"
                className="Poppitandfinchsans pb-2 text-black block"
            >
              TEAM
            </Typography>
            <Typography
                variant="h6"
                className="Poppitandfinchsans pb-2 text-white block"
            >
              Highly talented teams for lucky lemurs
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <RawImage
                    src={lemur4}
                    alt="icon"
                    className="p-2 mx-auto w-11/12"
                />
                <Typography
                    variant="h5"
                    className="Poppitandfinchsans p-2 text-white block"
                >
                  BraveWarrior <br/>
                  Artist
                </Typography>
                <Typography
                    variant="h6"
                    className="Poppitandfinchsans pb-2 text-white block"
                >
                  Design Expert
                </Typography>
              </Grid>
              <Grid item xs={12} md={6}>
                <RawImage
                    src={lemur5}
                    alt="icon"
                    className="p-2 mx-auto w-11/12"
                />
                <Typography
                    variant="h5"
                    className="Poppitandfinchsans p-2 text-white block"
                >
                  dJinn <br/>
                  Developer
                </Typography>
                <Typography
                    variant="h6"
                    className="Poppitandfinchsans pb-2 text-white block"
                >
                  Frontend/Backend
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </>
  );
}
