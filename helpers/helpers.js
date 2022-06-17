export function stringAvatar(name){
    let split = name.split(' ')
    console.log(split.length)
    if(split.length === 1){
        return {
            children: `${split[0].charAt(0)}`
              }
    } else {
        return {
      children: `${split[0].charAt(0)}${split[1].charAt(0)}`
        }  
    }

  }

  export function stringDates(date){
    let split = date.split(' ')
    console.log('date split', split)
    return `${split[1]} ${split[2]} ${split[3]} `
  }