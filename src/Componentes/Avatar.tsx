export function AvatarImg ( { alt, src } ) {
  return(
    <div>
      <img alt={alt} src={src} />
      
    </div>
  )
}

export function AvatarBackImage( { className, animation, url, backgroundPosition } ) {

  return(
    <div className={className} style={{animation: animation?animation:'none', backgroundPosition:`${backgroundPosition?backgroundPosition:'0px 0px'}`, backgroundImage:`url(${url})`}}>

    </div>
  )
}