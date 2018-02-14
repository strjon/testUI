$(window).on('load', function() {
    var contractAddress = "0x7dc0e3d2135e98629ea9CE99F13c4D82B1D397a3"; // in Ropsten testnet!
    var contractAbi = [{"constant":false,"inputs":[{"name":"s","type":"string"}],"name":"setGreeting","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getGreeting","outputs":[{"name":"s","type":"string"}],"payable":false,"stateMutability":"view","type":"function"}];

    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof web3 !== 'undefined') {
        // Use Mist/MetaMask's provider
        $('#content').append('<p>I has web3!!!</p>');
        window.web3 = new Web3(web3.currentProvider);
    } else {
        var errorMsg = 'I doesn\'t has web3 :( Please open in Google Chrome Browser and install the Metamask extension. test';
        $('#content').text(errorMsg);
        console.log(errorMsg);
        return;
    }
    
    // create instance of contract object that we use to interface the smart contract
    var contractInstance = web3.eth.contract(contractAbi).at(contractAddress);
    contractInstance.getGreeting(function(error, greeting) {
        if (error) {
            var errorMsg = 'error reading greeting from smart contract: ' + error;
            $('#content').append(errorMsg);
            console.log(errorMsg);
            return;
        }
        $('#content').text('greeting from contract: ' + greeting);
    });
    
    $('#my-form').on('submit', function(e) {
        console.log("This button works");
        e.preventDefault(); // cancel the actual submit
        
        var newGreeting = $('#greeting').val(); 

        
         contractInstance.setGreeting(newGreeting, function(error, txHash) {
            if (error) {
                var errorMsg = 'error writing new greeting to smart contract: ' + error;
                $('#content').text(errorMsg);
                console.log(errorMsg);
                return;
            }
            $('#content').text('submitted new greeting to blockchain, transaction hash: ' + txHash);
        }); 
    });

});

function cb(error, response) {
    // callback as helper function for debugging purposes
    console.log('error: ' + error + ', response: ' + response);
}
