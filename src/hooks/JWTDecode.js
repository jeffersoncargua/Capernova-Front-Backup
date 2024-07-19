

export const JWTDecode = (token) => {
  
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g,'+').replace(/_/g,'/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c){
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    const result = JSON.parse(jsonPayload);
    const unique_name=result.unique_name;
    //console.log(unique_name);
    const role = result.role;
    //console.log(role);
    const object = {unique_name,role}
    return object

}
