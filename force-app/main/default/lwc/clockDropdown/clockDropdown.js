import { LightningElement, api } from 'lwc';

export default class ClockDropdown extends LightningElement {

    /*Define the input properties that this component will accept
    - 'label' property will store the label of the dropdown
    - 'options' property will store the list of options to be displayed in the dropdown
    -  'uniqueId' property will store the unique identifier of the component */
    @api label
    @api options=[]
    @api uniqueId=''

    // Method to handle the change event of the dropdown
    selectChange(event){
        //console.log(this.label);
        //console.log(event.target.value);
        this.callParent(event.target.value) // Call the 'callParent' method with the selected value
    }

    // Method to dispatch a custom event to the parent component
    callParent(value){
        this.dispatchEvent(new CustomEvent('optionhandler',{
            detail:{
                label:this.label,
                value:value
            }
        }))
    }

    // Method to reset the value of the dropdown and call the 'callParent' method with the new value
    @api reset(value){
        this.template.querySelector('select').value=value
        this.callParent(value)
    }
}