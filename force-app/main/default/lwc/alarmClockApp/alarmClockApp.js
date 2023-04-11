import { LightningElement } from 'lwc';
import AlarmClockAssest from '@salesforce/resourceUrl/AlarmClockAssets';

export default class AlarmClockApp extends LightningElement {
    clockImage=AlarmClockAssest+'/AlarmClockAssets/clock.png'

    currentTime=''

    
    hours=[]
    minutes=[]
    meridians=["AM","PM"]

    alarmTime
    isAlarmSet=false
    isAlarmTriggered=false

    hourSelected
    minuteSelected
    meridianSelected


    get isFieldNotSelected(){
        return !(this.hourSelected && this.minuteSelected && this.meridianSelected)
    }

    get shakeImage(){
        return this.isAlarmTriggered ? 'shake':''
    }


    connectedCallback(){
        this.currentTimeHandler()
        this.createHoursOption()
        this.createMinutessOption()
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
        if(this.alarmTime===`${hours}:${minutes} ${ampm}`){
            console.log("Alarm Triggered");
            this.isAlarmTriggered=true
        }
        },1000)
        
    }

    createHoursOption(){
        for(let hour=1;hour<=12;hour++){
            let val=hour<10 ? "0"+hour :hour
            this.hours.push(val)
        }
    }

    createMinutessOption(){
        for(let minute=0;minute<=59;minute++){
            let val=minute<10 ? "0"+minute :minute
            this.minutes.push(val)
        }
    }

    optionHandler(event){
        const {label,value}=event.detail

        if(label==="Hour(s)"){
            this.hourSelected=value
        }
        else if(label==="Minute(s)"){
            this.minuteSelected=value
        }
        else if(label==="AM/PM"){
            this.meridianSelected=value
        }
        else{}

        console.log(this.hourSelected);
        console.log(this.minuteSelected);
        console.log(this.meridianSelected);
    }

    handleButton(){
        this.alarmTime= `${this.hourSelected}:${this.minuteSelected} ${this.meridianSelected}`
        this.isAlarmSet=true
    }

    clearButton(){

        this.alarmTime=''
        this.isAlarmSet=true
        this.isAlarmTriggered=false
        const elements=this.template.querySelectorAll('c-clock-dropdown')
        Array.from(elements).forEach(element=>{
            element.reset("")
        })
        
    }
}