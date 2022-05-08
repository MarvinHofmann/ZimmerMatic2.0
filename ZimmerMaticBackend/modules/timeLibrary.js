const main = require("../index");

/**
 * Formats the current date for the DB 
 * @returns date as Strign seperated with ":"
 */
function getDBFormatDate() {
    a = new Date();
    //return e.g.: 13:02:2022
    if (a.getDate() < 10) {
      if (a.getMonth()+1 < 10) {
        return String("0" + a.getDate()) + ":0" + String(a.getMonth() + 1) + ":" + String(a.getUTCFullYear());  
      }else{
        return String("0" + a.getDate()) + ":" + String(a.getMonth() + 1) + ":" + String(a.getUTCFullYear());  
      }
    }
    if (a.getMonth() + 1 < 10) {
      if (a.getDate() < 10) {
        return String("0" + a.getDate()) + ":0" + String(a.getMonth() + 1) + ":" + String(a.getUTCFullYear());  
      }else{
        return String(a.getDate()) + ":0" + String(a.getMonth() + 1) + ":" + String(a.getUTCFullYear());  
      }
    }else{
      return String(a.getDate()) + ":" + String(a.getMonth() + 1) + ":" + String(a.getUTCFullYear());  
    }  
  }
  exports.getDBFormatDate = getDBFormatDate;
  
  /**
   * Formats current time to String for the DB
   * @returns current Time as string seperated with ":"
   */
  function getDBFormatTime() {
    a = new Date();
    if (a.getMinutes() < 10) {
      //return bsp.: 17:02 
      return String(a.getHours()) + ":0" + String(a.getMinutes())
    } else {
      return String(a.getHours()) + ":" + String(a.getMinutes())
    }
  }
  exports.getDBFormatTime = getDBFormatTime;