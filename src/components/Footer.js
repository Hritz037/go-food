import React from 'react'
import {Link} from 'react-router-dom';
export default function Footer() {
  return (
    <div>
      <footer className="d-flex flex-wrap justify-content-end  align-items-center py-3 my-4 border-top">
    <div className="col-md-4 d-flex justify-content-end">
      <Link to="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
        {/* <svg class="bi" width="30" height="24"><use xlink:href="#bootstrap"></use></svg> */}
      </Link>
      <span className="text-muted px-5">© 2023 GoFood, Inc</span>
    </div>
    {/* <ul class="nav col-md-4 justify-content-end list-unstyled d-flex"> */}
      {/* <li class="ms-3"><a class="text-muted" href="#"><svg class="bi" width="24" height="24"><use xlink:href="#twitter"></use></svg></a></li>
      <li class="ms-3"><a class="text-muted" href="#"><svg class="bi" width="24" height="24"><use xlink:href="#instagram"></use></svg></a></li>
      <li class="ms-3"><a class="text-muted" href="#"><svg class="bi" width="24" height="24"><use xlink:href="#facebook"></use></svg></a></li> */}
   {/* a cant be used instead use Link*/}
    {/* </ul> */}
  </footer>

    </div>
  )
}
