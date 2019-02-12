export function isAllAlphabets(value) {
    if (/^[a-z]*$/i.test(value)) {
        return true;
    }
    return false ;
 }
 export function alowNumbersOnly(value) {
    if (/^[0-9 -]*$/i.test(value)) {
        return true;
    }
    return false ;
 }
 
 export function isAlphabetsSpace(value) {
    if (/^[a-z ]*$/i.test(value)) {
        return true;
    }
    return false ;
 }
 export function isNotEmpty(value){
    if(value && value.trim())
        return true;
    return false ;
 }
 
 
 export function isLengthValid(value, min, max){
     value= value.trim();
     if(value.length<min || value.length>max)
         return false;
     return true;
 }
 
 //validates indian mobile number
 export function isPhoneNo(value){
   value= value.trim();
   if(/\d{4}([- ]*)\d{6}/.test(value) && value.length<15){
     return true
   }
   return false
 }
 
 //validates indian mobile number
 export function isValidEmail(value){
   console.log("Value ---------", value)
   let regex =
 /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
   value= value.trim();
   if(regex.test(value)){
     return true
   }
   return false
 }
 
 export function isMatch(string1, string2){
   string1= string1.trim()
   string2=string2.trim()
   if(string1==string2)
     return true
   else
     return false
 }
 
 
 export function containsNumber(string){
   if(/\d/.test(string)) {
     return true
   }
   else {
     return false
   }
 }
 
 export function checkForAtleastOneCapital(string){
   if (/[A-Z]+/.test(string)) {
     return true
   }
   else {
     return false
   }
 }
 
 export function onlyIntegers(key){
   let regex = /^[0-9]*$/;
   if( !regex.test(key) ) {
     return false
   }
   else{
     return true
   }
 }
 
 export function isValidPhone(inputtxt){
   var phoneno = /^\d{10}$/;
   if(phoneno.test(inputtxt)) {
       return true;
   }
   else {
      return false;
   }
 }
 