const express = require('express')
const app =express()
const users=[{
    name : "jhon",
    kidenys :[{
        healthy:false
    },
    { 
    healthy:true 
} ]
}];

app.use(express.json());

app.get('/',function(req,res){
const JhonsKidenys = users[0].kidenys;
const numberOfKidenys = JhonsKidenys.length;
let numberOfHealthyKidenys = 0;
for (let i=0;i<JhonsKidenys.length;i++){
    if (JhonsKidenys[i].healthy){
    numberOfHealthyKidenys = numberOfHealthyKidenys +1;
    }
}
const numberOfUnhealthyKidenys =numberOfKidenys-numberOfHealthyKidenys;
res.json({
    numberOfKidenys,
    numberOfHealthyKidenys,
    numberOfUnhealthyKidenys
})
})

app.post('/',function (req,res){
    const isHealthy =req.body.isHealthy
    users[0].kidenys.push({
        healthy:isHealthy
    })
    res.json({
        ms:"Done!"
    })
})

app.put('/',function(req,res){
    if(isThereAnyBadKidenys()){
    for (let i=0;i<users[0].kidenys.length;i++){
        users[0].kidenys[i].healthy =true;
    }
    res.json({
        ms:"Done!"
    })
}
 else{
        res.status(411).json({
        msg:"Congrats U Don't Have Bad Kidneys"
    });
    }
})

app.delete('/',function (req,res){
    if(isThereAnyBadKidenys()){
        const newKidenys=[];
    for(let i=0;i<users[0].kidenys.length;i++){
        if(users[0].kidenys[i].healthy){
            newKidenys.push({
                healthy :true
            })
        }
    }
    users[0].kidenys=newKidenys
    res.json({
        msg:"Done!"
    });
    }
    else{
        res.status(411).json({
        msg:"Congrats U Don't Have Bad Kidneys"
    });
    }
})

function isThereAnyBadKidenys(){
    let isThereAnyBadKidenys =false;
     for(let i=0;i<users[0].kidenys.length;i++){
        if(!users[0].kidenys[i].healthy){
            isThereAnyBadKidenys =true;
        }
    }
    return isThereAnyBadKidenys; 
}
app.listen(3000);
