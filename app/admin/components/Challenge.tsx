import {
  Create,
  Datagrid,
  Edit,
  List,
  NumberField,
  NumberInput,
  ReferenceField,
  ReferenceInput,
  SelectField,
  SelectInput,
  SimpleForm,
  TextField,
  TextInput,
  required,
} from 'react-admin'

const CHOICES = [
  { id: 'SELECT', name: 'SELECT' },
  { id: 'ASSIST', name: 'ASSIST' },
]

export const ChallengeCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="question" validate={[required()]} label="Question" />
        <SelectInput source="type" choices={CHOICES} validate={[required()]} />
        <ReferenceInput source="lessonId" reference="lessons" />
        <TextInput source="order" validate={[required()]} label="Order" />
      </SimpleForm>
    </Create>
  )
}

export const ChallengeList = () => {
  return (
    <List>
      <Datagrid rowClick="edit">
        <NumberField source="id" />
        <TextField source="question" />
        <SelectField source="type" choices={CHOICES} />
        <ReferenceField source="lessonId" reference="lessons" />
        <TextField source="order" />
      </Datagrid>
    </List>
  )
}

export const ChallengeEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <NumberInput source="id" validate={[required()]} label="Id" />
        <TextInput source="question" validate={[required()]} label="Question" />
        <SelectInput source="type" choices={CHOICES} />
        <ReferenceInput source="lessonId" reference="lessons" />
        <TextInput source="order" validate={[required()]} label="Order" />
      </SimpleForm>
    </Edit>
  )
}
