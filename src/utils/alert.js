import swal from "sweetalert";
export const Alert = (title, icon, text) => {
  swal({
    title,
    icon,
    text,
    buttons: "متوجه شدم!",
  });
};

export const AlertDetele = (title, text, icon) => {
  return new Promise((resolve) => {
    swal({
      title,
      text,
      icon,
      buttons: true,
      dangerMode: true,
      
    }).then((willDelete) => {
      resolve(willDelete);
    });
  });
};

