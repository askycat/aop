var dayType;

$(function ($) {

    dayType = $(".dayType.active").attr("day");

    $("#stake").on("click", function () {
        var stakeAmount = document.querySelector('#stakeAmount').value;
        if (stakeAmount < 50000) { alert("min amount:50000"); return; }
        AOP.methods.stake(web3.utils.toWei(stakeAmount), dayType).send({ from: account[0] });
    });
    $("#unstake").on("click", function () {
        var unStakeAmount = document.querySelector('#unStakeAmount').value;
        AOP.methods.unstake(web3.utils.toWei(unStakeAmount), dayType).send({ from: account[0] });
    });

    $("#collect").on("click", function () {
        AOP.methods.collect().send({ from: account[0] });
    });

    function getCountDown(timestamp) {
        setInterval(function () {
            var nowTime = new Date();
            var endTime = new Date(timestamp * 1000);

            var t = endTime.getTime() - nowTime.getTime();
            if (t <= 0) {
                $("#countDown1").html("00:00:00");
                return;
            }
            //            var d=Math.floor(t/1000/60/60/24);
            var hour = Math.floor(t / 1000 / 60 / 60 % 24);
            var min = Math.floor(t / 1000 / 60 % 60);
            var sec = Math.floor(t / 1000 % 60);

            if (hour < 10) {
                hour = "0" + hour;
            }
            if (min < 10) {
                min = "0" + min;
            }
            if (sec < 10) {
                sec = "0" + sec;
            }
            var countDownTime = hour + ":" + min + ":" + sec;
            $("#countDown1").html(countDownTime);

        }, 1000);
    }


    var contractAddress = '0xc6bf922897ae9002e210A870434754807C2821F3';
    var AOPAbi = [{ "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "tokens", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "tokens", "type": "uint256" }], "name": "Burn", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "tokens", "type": "uint256" }], "name": "Collect", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "tokens", "type": "uint256" }], "name": "Dividend", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "tokens", "type": "uint256" }], "name": "Stake", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "uint256", "name": "tokens", "type": "uint256" }], "name": "Tax", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "tokens", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "tokens", "type": "uint256" }], "name": "Unstake", "type": "event" }, { "constant": true, "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "SHARE_DIVIDENDS", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "allInfo", "outputs": [{ "internalType": "uint256", "name": "tokenTotalSupply", "type": "uint256" }, { "internalType": "uint256", "name": "tokenTotalStaked", "type": "uint256" }, { "internalType": "uint256", "name": "tokenTotalDividends", "type": "uint256" }, { "internalType": "uint256", "name": "tokenTotalBurn", "type": "uint256" }, { "internalType": "uint256", "name": "userStake7", "type": "uint256" }, { "internalType": "uint256", "name": "userStake15", "type": "uint256" }, { "internalType": "uint256", "name": "userStake30", "type": "uint256" }, { "internalType": "uint256", "name": "userDividends", "type": "uint256" }, { "internalType": "uint256", "name": "collectTime", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "_user", "type": "address" }, { "internalType": "address", "name": "_spender", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "_spender", "type": "address" }, { "internalType": "uint256", "name": "_tokens", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "_user", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address[]", "name": "_receivers", "type": "address[]" }, { "internalType": "uint256[]", "name": "_amounts", "type": "uint256[]" }], "name": "bulkTransfer", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "uint256", "name": "_share", "type": "uint256" }, { "internalType": "uint256", "name": "dayType", "type": "uint256" }], "name": "changeShare", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [], "name": "collect", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "_user", "type": "address" }], "name": "collectTimeOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "dividend", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "_user", "type": "address" }], "name": "dividendsOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "dividendsOfPool", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "uint256", "name": "_tokens", "type": "uint256" }, { "internalType": "uint256", "name": "dayType", "type": "uint256" }], "name": "stake", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "_user", "type": "address" }, { "internalType": "uint256", "name": "dayType", "type": "uint256" }], "name": "stakedOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "stakedOfPool", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "stakedUsers", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "totalBurn", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "totalDev", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "totalDividends", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "totalStaked", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "_to", "type": "address" }, { "internalType": "uint256", "name": "_tokens", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "_from", "type": "address" }, { "internalType": "address", "name": "_to", "type": "address" }, { "internalType": "uint256", "name": "_tokens", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "uint256", "name": "_tokens", "type": "uint256" }, { "internalType": "uint256", "name": "dayType", "type": "uint256" }], "name": "unstake", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }]
    window.onload = async () => {
        if (typeof window.ethereum !== 'undefined') {
            console.log('MetaMask is installed!');
        } else {
            alert("MetaMask is not installed!")
            return;
        }

        var web3Provider;
        if (window.ethereum) {
            web3Provider = window.ethereum;
            try {
                await window.ethereum.enable();
            } catch (error) {
                console.error("User denied account access")
            }
        } else if (window.web3) {
            web3Provider = window.web3.currentProvider;
        } else {
            web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
        }
        web3 = new Web3(web3Provider);
        account = await web3.eth.getAccounts();
        AOP = new web3.eth.Contract(AOPAbi, contractAddress);

        setInterval(async () => {
            var info = await AOP.methods.allInfo(account[0]).call()
            
            document.querySelector("#totalStaked").innerText = (info.tokenTotalStaked / 1e18).toFixed(4);
            document.querySelector("#totalDividends").innerText = (info.tokenTotalDividends / 1e18).toFixed(4);
            document.querySelector("#totalBurn").innerText = ((info.userStake7 + info.userStake15 + info.userStake30) / 1e18).toFixed(4);
            document.querySelector("#userTotalStaked").innerText = (info.userTotalStaked / 1e18).toFixed(4);
            document.querySelector("#userdividends").innerText = (info.userDividends / 1e18).toFixed(4);
            document.querySelector("#userStake7").innerText = (info.userStake7 / 1e18).toFixed(4);
            document.querySelector("#userStake15").innerText = (info.userStake15 / 1e18).toFixed(4);
            document.querySelector("#userStake30").innerText = (info.userStake30 / 1e18).toFixed(4);
            var collectTime = (info.collectTime / 1e18);

            getCountDown(collectTime);
        }, 3000);




    }
})

