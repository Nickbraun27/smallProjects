let currentOperation;
let fields = {
    input1: $("#input1"),
    select1: $("#select1"),
    output: $("#output")
}

$("#homeButton").on("click", function() {
    console.log("jquery works");
})

$(".mathfunction").on("click", function() {  //when an option in the dropdown is selected
    let title = $(this).html();
    $("#mathHeader").html(title);
    currentOperation = $(this).data("type");

})

$("#calculate").on("click", function() {
    switchOperator(0);

})

function switchOperator(type) {
    switch(currentOperation) {
        case "piToN":
            if(type == 0) {  //compute button hit
                fields.output.html(exponentiate(Math.PI, fields.input1.val()));
                break;
            }
            else {  //update form

            }
        case "eToN":
            if(type == 0) {
                fields.output.html(exponentiate(Math.E, fields.input1.val()));
                break;
            }
        case "fib":
            if(type == 0) {
                fields.output.html(findFibbonacci(fields.input1.val(), fields.select1.val()));
                break;
            }
        case "prime":
            if(type == 0) {
                fields.output.html(findPrimeFactors(fields.input1.val()));
                break;
            }
        case "nextPrime":
            if(type == 0) {
                let nextPrime = findNextPrime(fields.input1.val());
                fields.output.html("The next prime after " + fields.input1.val() + " is " + nextPrime);
                fields.input1.val(findNextPrime(fields.input1.val()));
            }
        case "mortgage":
            if(type==0) {
                calculateMortgage();
                break;
            }
            else {

            }
        default: 
            console.log("error");
    }

}

function exponentiate(x, n) {
    if(n==1) {
      return x;  
    }
    else {
        if(n%2==0) {
            return exponentiate((x * x), n/2);
        }
        else {
            return (x * exponentiate((x * x), (n-1)/2));
        }
    }
}

function findFibbonacci(n, type) {

    let prevValue = 0;
    let currValue = 1;
    if(type == 0) {
        if(n==0) {
            return 0;
        }
        for(let i=0;i<n-1;i++) {
            let temp = currValue;
            currValue += prevValue;
            prevValue = temp;
        }
        return currValue;
    }
    else {
        let count = 1;
        while(currValue < n) {
            let temp = currValue;
            currValue += prevValue;
            prevValue = temp;
            count++;
        }
        if(currValue == n || n==0) {
            return("N is the " + addOrdinals(count) + " number in the fibonacci sequence ")
        }
        else {
            return ("N is not in the fibonacci sequence");
        }
    }
}

function findPrimeFactors(n) {
    return (n + "'s prime factors are " + calcPrimeFactors(n));
}

function calcPrimeFactors(n) {
    let factors = "";
    while(n%2 == 0) {
        factors += 2 + ", ";
        n=n/2;
    }

    for(let i=3;i<Math.sqrt(n);i+=2) {
        while(n%i == 0) {
            factors+= i + ", ";
            n = n/i;
        }
    }

    if(n>2) {
        factors += n;
    }
    return factors;
}

function findNextPrime(n) {
    if(n<=0) {
        return "Please enter a positive integer";
    }
    else if(n==1 || n ==2) {
        return parseInt(n)+1;
    }
    n++;
    if(n%2 == 0) {
        n++;
    }

    while(true) {
        let factors = calcPrimeFactors(n);
        if(factors == n) {
            break;
        }
        n+=2;
    }

    return n;
}

function calculateMortgage() {
    let term = 20; //in years;
    let paymentRate = 12;
    let interestRate = .05/paymentRate;
    
    let monthlyPayment = 850;
    let compoundRate = 52.18; //can equal 12, 52.18, 365.25, Math.Max 
    let principal = 170000;
    let numTerms = 360;


    let principalAfterT = (monthlyPayment * (paymentRate/compoundRate)*(((exponentiate((1+(interestRate/paymentRate)), (paymentRate*20 )) - 1))/(interestRate/paymentRate)));
    console.log(principalAfterT);
}


function addOrdinals(x) {

    switch(x) {
        case 1: 
            return (x+"st");
            break;
        case 2: 
            return (x+"nd");
            break;
        case 3: 
            return (x+"rd");
            break;
        default:   
            return (x+"th");
    }
}
