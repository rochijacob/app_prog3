import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeLocal = async (value, varname, json = false) =>{
  try {
    if (json){
      value = JSON.stringify(value)
    }
    varname = '@'+varname
    await AsyncStorage.setItem(varname, value)
  } catch (e) {
    // saving error
  }
}

export const retrieveLocal = async (varname, json = false) => {
  try {
    const value = await AsyncStorage.getItem('@'+varname)
    if(value === null) {
      return false
    }
    if (json){
      return JSON.parse(value)
    }
    return value
  } catch(e) {
    console.log(e)
    console.log('error')
    return false
  }
}

export const removeLocal = async(varname) => {
  try {
      await AsyncStorage.removeItem('@'+varname);
      return true;
  }
  catch(exception) {
      console.log('no se pudo borrar')
      return false;
  }
}