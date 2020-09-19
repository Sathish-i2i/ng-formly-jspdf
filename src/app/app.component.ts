import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = [
    {
      key: 'text',
      type: 'input',
      templateOptions: {
        label: 'Text',
        placeholder: 'Formly is terrific!',
        required: true,
      },
    },
    {
      key: 'date1',
      type: 'input',
      templateOptions: {
        label: 'Date (using default validator options declared in ngModule)',
        type: 'date',
      }
    },
    {
      key: 'marvel1',
      type: 'select',
      templateOptions: {
        label: 'Normal Select',
        options: [
          {label: 'Iron Man', value: 'iron_man'},
          {label: 'Captain America', value: 'captain_america'},
          {label: 'Black Widow', value: 'black_widow'},
          {label: 'Hulk', value: 'hulk'},
          {label: 'Captain Marvel', value: 'captain_marvel'},
        ],
      },
    },
    {
      key: 'marvel3',
      type: 'select',
      templateOptions: {
        label: 'Select with custom name/value/group',
        options: [
          {label: 'Iron Man', id: 'iron_man', gender: 'Male'},
          {label: 'Captain America', id: 'captain_america', gender: 'Male'},
          {label: 'Black Widow', id: 'black_widow', gender: 'Female'},
          {label: 'Hulk', id: 'hulk', gender: 'Male'},
          {label: 'Captain Marvel', id: 'captain_marvel', gender: 'Female'},
        ],
        groupProp: 'gender',
        valueProp: 'id',
        labelProp: 'label',
      },
    },
    {
      key: 'multiselect',
      type: 'select',
      templateOptions: {
        label: 'Multi-select',
        multiple: true,
        options: [
          {label: 'Iron Man', value: 'iron_man'},
          {label: 'Captain America', value: 'captain_america'},
          {label: 'Black Widow', value: 'black_widow'},
          {label: 'Hulk', value: 'hulk'},
          {label: 'Captain Marvel', value: 'captain_marvel'},
          {label: 'Iron Man', value: 'iron_man'},
          {label: 'Captain America', value: 'captain_america'},
          {label: 'Black Widow', value: 'black_widow'},
          {label: 'Hulk', value: 'hulk'},
          {label: 'Captain Marvel', value: 'captain_marvel'},
          {label: 'Iron Man', value: 'iron_man'},
          {label: 'Captain America', value: 'captain_america'},
          {label: 'Black Widow', value: 'black_widow'},
          {label: 'Hulk', value: 'hulk'},
          {label: 'Captain Marvel', value: 'captain_marvel'},
        ],
      },
    },
    {
      key: 'nested.story',
      type: 'textarea',
      templateOptions: {
        label: 'Some sweet story',
        placeholder: 'It allows you to build and maintain your forms with the ease of JavaScript :-)',
        description: '',
      },
      expressionProperties: {
        'templateOptions.focus': 'formState.awesomeIsForced',
        'templateOptions.description': (model, formState) => {
          if (formState.awesomeIsForced) {
            return 'And look! This field magically got focus!';
          }
        },
      },
    },
    {
      key: 'awesome',
      type: 'checkbox',
      templateOptions: { label: '' },
      expressionProperties: {
        'templateOptions.disabled': 'formState.awesomeIsForced',
        'templateOptions.label': (model, formState) => {
          if (formState.awesomeIsForced) {
            return 'Too bad, formly is really awesome...';
          } else {
            return 'Is formly totally awesome? (uncheck this and see what happens)';
          }
        },
      },
    },
    {
      key: 'whyNot',
      type: 'textarea',
      expressionProperties: {
        'templateOptions.placeholder': (model, formState) => {
          if (formState.awesomeIsForced) {
            return 'Too bad... It really is awesome! Wasn\'t that cool?';
          } else {
            return 'Type in here... I dare you';
          }
        },
        'templateOptions.disabled': 'formState.awesomeIsForced',
      },
      hideExpression: 'model.awesome',
      templateOptions: {
        label: 'Why Not?',
        placeholder: 'Type in here... I dare you',
      },
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-6',
          type: 'input',
          key: 'firstName',
          templateOptions: {
            label: 'First Name',
          },
        },
        {
          className: 'col-6',
          type: 'input',
          key: 'lastName',
          templateOptions: {
            label: 'Last Name',
          },
          expressionProperties: {
            'templateOptions.disabled': '!model.firstName',
          },
        },
      ],
    },
    {
      className: 'section-label',
      template: '<hr /><div><strong>Address:</strong></div>',
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-6',
          type: 'input',
          key: 'street',
          templateOptions: {
            label: 'Street',
          },
        },
        {
          className: 'col-3',
          type: 'input',
          key: 'cityName',
          templateOptions: {
            label: 'City',
          },
        },
        {
          className: 'col-3',
          type: 'input',
          key: 'zip',
          templateOptions: {
            type: 'number',
            label: 'Zip',
            max: 99999,
            min: 0,
            pattern: '\\d{5}',
          },
        },
      ],
    },
    { template: '<hr />' },
    {
      type: 'textarea',
      key: 'otherInput',
      templateOptions: {
        label: 'Other Input',
      },
    },
    {
      type: 'checkbox',
      key: 'otherToo',
      templateOptions: {
        label: 'Other Checkbox',
      },
    }
  ];

  submit(): void {
    if (this.form.valid) {
      alert(JSON.stringify(this.model));
    }
  }
}
