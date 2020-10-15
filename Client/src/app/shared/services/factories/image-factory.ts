// export let  getImagem =function(readerEvt, midia){
//     //console.log('change no input file', readerEvt);
//    // let file = fi;
//    let file = readerEvt.target.files[0];
//    var reader = new FileReader();
//    reader.readAsDataURL(file);
//     reader.onload = function () {
//         //console.log('base64 do arquivo',reader.result);
//         midia=btoa(reader.result);
//         //console.log('base64 do arquivo codificado',midia.binario);
//     };
//    return reader.onerror = function (error) {
//         console.log('Erro ao ler a imagem : ', error);
//         midia= null;
//     };
// }

import {AbstractControl} from '@angular/forms';
export class PasswordValidation {

    static MatchPassword(AC: AbstractControl) {
       let newPassword = AC.get('newPassword').value; // to get value in input tag
       let confirmPassword = AC.get('confirmPassword').value; // to get value in input tag
        if(newPassword != confirmPassword) {
            console.log('false');
            AC.get('confirmPassword').setErrors( {MatchPassword: true} )
        } else {
            console.log('true');
            return null
        }
    }
}