import React from 'react'
import './Title.css'
function Title({ rdata,clicked }) {
    
    return (
        <div>
            <div className="parent">
                {
                    rdata.map(each => {
                        return <div className='parent-1'>
                            <div className="parent-2">
                                <h5>{each.creator}</h5>
                                {
                                    each.links[0]==='/'?each.links="https://medium.com"+each.links:console.log("nothing happended")
                                }
                                <a href={each.links} target={'_blank'} rel="noreferrer">{each.title}</a>
                                
                                {/* <a className='title' href={each.links}>{each.title}</a> */}
                            </div>
                            <h5>{each.blog}</h5>
                            <div className='tags'>Tags-{each.tags}</div>
                            <div className="time">
                                <div>{each.upload} .</div>
                                <div>{each.time}</div>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}
export default Title
