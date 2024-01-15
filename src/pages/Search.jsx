
import { SearchHeader } from '../cpms/SearchHeader'

export function Search (){

    function isMobile(){
        return (window.innerWidth > 700) ? false:true
      }
        
      function getClass(){
        return (window.innerWidth > 700) ? 'big-modal':'page-mobile'
      }
      
    return (
        <section className={'search '+ getClass()}>
             { isMobile() &&   <SearchHeader/>}
        { !isMobile() &&   <h3>Search</h3>}
        </section>
    )
}