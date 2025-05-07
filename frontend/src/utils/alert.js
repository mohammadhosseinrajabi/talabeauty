import swal from "sweetalert"
export const Alert =(title,icon,text)=>{
    swal({
        title,
        icon,
        text,
        buttons:"متوجه شدم!"
    })
}