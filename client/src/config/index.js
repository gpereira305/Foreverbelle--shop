export const apiUrl = "http://localhost:5000";


// deixa a primeira letra do nome do usuário maiúscula
export const toUpper = (str) => { 
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word[0].toUpperCase() + word.substr(1))
      .join(" ");
      
};
 