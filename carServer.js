var express = require("express");
var app = express();
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE,OPTIONS");
  next();
});
// let port = 2410;
var port= process.env.PORT||2410;

app.listen(port, () => console.log("listening on port : ", port));


let carMaster = [
    {
        model: "Swift Dzire VXi",
        make: "Maruti",
        fuel: "Diesel",
        colors: ["White", "Silver Grey", "Metallic Blue", "Red"],
        type: "Sedan",
        transmission: "Manual",
    },
    {
        model: "Etios SMi",
        make: "Toyota",
        fuel: "Diesel",
        colors: ["White", "Steel Grey", "Black"],
        type: "Hatchback",
        transmission: "Manual",
    },
    {
        model: "City AXi",
        make: "Honda",
        fuel: "Petrol",
        colors: ["Silver Grey", "Metallic Blue", "Black"],
        type: "Sedan",
        transmission: "Automatic",
    },
    {
        model: "Swift DXi",
        make: "Maruti",
        fuel: "Diesel",
        colors: ["White", "Red", "Black"],
        type: "Hatchback",
        transmission: "Manual",
    },
    {
        model: "Etios VXi",
        make: "Toyota",
        fuel: "Diesel",
        colors: ["White", "Silver Grey", "Black"],
        type: "Sedan",
        transmission: "Manual",
    },
    {
        model: "City ZXi",
        make: "Honda",
        fuel: "Petrol",
        colors: ["Silver Grey", "Metallic Blue", "Red"],
        type: "Sedan",
        transmission: "Manual",
    },
];
let cars = [
    {
        id: "ABR12",
        price: 400000,
        year: 2015,
        kms: 25000,
        model: "Swift Dzire VXi",
        color: "White",
    },
    {
        id: "CBN88",
        price: 480000,
        year: 2012,
        kms: 75000,
        model: "Etios SMi",
        color: "Steel Grey",
    },
    {
        id: "XER34",
        price: 300000,
        year: 2013,
        kms: 55000,
        model: "City AXi",
        color: "Metallic Blue",
    },
    {
        id: "MPQ29",
        price: 400000,
        year: 2015,
        kms: 25000,
        model: "Swift DXi",
        color: "Black",
    },
    {
        id: "PYQ88",
        price: 480000,
        year: 2012,
        kms: 75000,
        model: "Etios VXi",
        color: "White",
    },
    {
        id: "DFI61",
        price: 300000,
        year: 2013,
        kms: 55000,
        model: "City ZXi",
        color: "Red",
    },
    {
        id: "JUW88",
        price: 400000,
        year: 2015,
        kms: 25000,
        model: "Swift Dzire VXi",
        color: "White",
    },
    {
        id: "KPW09",
        price: 285000,
        year: 2012,
        kms: 76321,
        model: "Swift Dzire VXi",
        color: "White",
    },
    {
        id: "NHH09",
        price: 725000,
        year: 2018,
        kms: 15000,
        model: "City ZXi",
        color: "Silver Grey",
    },
    {
        id: "CTT26",
        price: 815000,
        year: 2016,
        kms: 42500,
        model: "City AXi",
        color: "Metallic Blue",
    },
    {
        id: "VAU55",
        price: 345000,
        year: 2014,
        kms: 81559,
        model: "Swift DXi",
        color: "Red",
    },
    {
        id: "BTR31",
        price: 184000,
        year: 2011,
        kms: 120833,
        model: "Etios VXi",
        color: "Silver Grey",
    },
];

app.get("/carMaster", function (req, res) {
    res.send(carMaster);
});

app.get("/cars", function (req, res) {
    let minprice = req.query.minprice;
    let maxprice = req.query.maxprice;
    let fuel = req.query.fuel;
    let type = req.query.type;
    let sort = req.query.sort;
    // console.log(minprice, maxprice, fuel, type, sort);
    let copyArr = cars;
    if (minprice) {
        copyArr = copyArr.filter((obj) => obj.price > +minprice);
    }
    if (maxprice) {
        copyArr = copyArr.filter((obj) => obj.price < +maxprice);
    }
    if (fuel) {
        copyArr = copyArr.filter((obj) => {
            let find = carMaster.find((obj1) => obj1.model === obj.model);
            if (find.fuel === fuel) return obj;
        });
    }
    if (type) {
        copyArr = copyArr.filter((obj) => {
            let find = carMaster.find((obj1) => obj1.model === obj.model);
            if (find.type === type) return obj;
        });
    }
    if (sort) {
        if (sort === "kms") copyArr.sort(compKms);
        if (sort === "price") copyArr.sort(compPrice);
        if (sort === "year") copyArr.sort(compYear);
    }
    if (minprice || maxprice || fuel || type || sort) {
        res.send(copyArr);
    } else {
        res.send(cars);
    }
});

compKms = (c1, c2) => c1.kms - c2.kms;
compPrice = (c1, c2) => c1.price - c2.price;
compYear = (c1, c2) => c1.year - c2.year;

app.get("/car/:id", function (req, res) {
    let id = req.params.id;
    let find = cars.find((obj) => obj.id === id);
    console.log(find);
    if (find) {
        res.send(find);
    } else {
        res.send("Not Found");
    }
});

app.post("/addCar", function (req, res) {
    let obj = req.body;
    console.log(obj);
    let find = cars.find((obj1) => obj1.id === obj.id);
    if (find) {
        res.send("Id Already Exist");
    } else {
        cars.push(obj);
        res.send(obj);
    }
});

app.put("/editCar/:id", function (req, res) {
    let id = req.params.id;
    let obj = req.body;
    console.log(id);
    console.log(obj);
    let index = cars.findIndex((obj1) => obj1.id === id);
    if (index !== -1) {
        cars[index] = obj;
        res.send(obj);
    } else {
        res.send("Not Found");
    }
});

app.delete("/deleteCar/:id", function(req,res) {
    let id = req.params.id;
    let index = cars.findIndex((c1) => c1.id === id);
    if (index >= 0) {
        let obj1 = cars.splice(index,1);
        res.send(obj1);
    }
    else res.status(404).send("No Car Found");
});
