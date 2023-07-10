const express = require('express')
const app = express()
const port = 3000
var bodyParser = require('body-parser')


app.use(bodyParser.json())

// app.get('/phone', (req, res) => {


//   const phoneNumber =req.body.phoneNumber
//   if(!phoneNumber){
//     console.log("bạn chưa điền số điện thoại")
//   }
//   const subNumber = phoneNumber.substring(0,3);
//   switch (subNumber) {
//     case "032" ||"033"||"034"||"035"||"036"||"037"||"038"||"039":
//        return  res.send("số này của nhà mạng viettheo")
//     case "070"||"079"||"077"||"076"||"078":
//        return  res.send("đây là nhà mobifone")
//     case "083"||"084"||"082"||"081"||"085":
//         return res.send("số này của nhà mạng vinaphone")
//     default:return res.send("so nay khongo thuoc nha mang nao ca")
//   }
// })

 
function calculateAge(dateString) {
  var today = new Date();
  var parts = dateString.split('-');
  var day = parseInt(parts[0], 10);
  var month = parseInt(parts[1], 10) - 1;
  var year = parseInt(parts[2], 10);
  var birthDate = new Date(year, month, day);

  var age = today.getFullYear() - birthDate.getFullYear();
  var monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}
app.post('/birthDay', (req, res) => {
  const listDate = req.body;
  const arrayListDate = listDate.date.split(',');
  var ageList = arrayListDate.map(function(dateString) {
    return calculateAge(dateString);
  });
  var ageListFilter=ageList.map((age) => {
     if (age <0) return "năm sinh của bạn lớn hơn năm hiện tại"
     else return age
  })
  res.send(ageListFilter);

  
});
app.get('/',(req, res) => {
  res.send("hello word")
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})