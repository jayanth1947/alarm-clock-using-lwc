import { LightningElement } from 'lwc';
import AlarmClockAssest from '@salesforce/resourceUrl/AlarmClockAssets';

export default class AlarmClockApp extends LightningElement {
    clockImage=AlarmClockAssest+'/AlarmClockAssets/clock.png'

    currentTime=''

    connectedCallback(){
        this.currentTimeHandler()
    }

    currentTimeHandler(){

        setInterval(()=>{
            let dateTime=new Date()
        let hours=dateTime.getHours()
        let minutes=dateTime.getMinutes()
        let seconds=dateTime.getSeconds()

        let ampm="AM"

        if(hours==0){
            hours=12
        }
        else if(hours>=12){
            hours=hours-12
            ampm="PM"
        }

        hours=hours<10 ? "0"+hours :hours
        minutes=minutes<10  ? "0"+minutes :minutes
        seconds=seconds<10 ? "0"+seconds: seconds

        this.currentTime=`${hours}:${minutes}:${seconds} ${ampm}`
        },1000)
        
    }
}