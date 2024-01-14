
export function Notification (){

  
  function getClass(){
    return (window.innerWidth > 700) ? 'notification-modal':'notification-mobile'
  }
    
    return (
        <section className={'notification '+ getClass()}>
            
            <h2>Notifications</h2>
        </section>
    )
}