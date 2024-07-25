

export const JWTDecode = (token) => {
  
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g,'+').replace(/_/g,'/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c){
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    const result = JSON.parse(jsonPayload);
    const unique_name = result.unique_name;
    //console.log(unique_name);
    const role = result.role;
    //console.log(role);
    const id = result.nameid; // contiene el id del usuario

    const name = result.actort;

    const lastName = result.given_name; // contiene el apellido del usuario

    const object = {id,unique_name, role, name, lastName}
    //console.log(object);
    return object

}


/*
"unique_name": "cmyd_nleww12@juaxe.com",
  "role": "Teacher",
  "nameid": "a4836aad-d5bd-4935-9ac7-ee61fc521dc4",
  "actort": "Guillermo",
  "given_name": "Cargua", */