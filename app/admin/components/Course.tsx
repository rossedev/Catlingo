import {
  Create,
  Datagrid,
  Edit,
  List,
  NumberField,
  NumberInput,
  SimpleForm,
  TextField,
  TextInput,
  required,
} from 'react-admin'

export const CourseCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="title" validate={[required()]} label="Title" />
        <TextInput source="imageSrc" validate={[required()]} label="Image" />
      </SimpleForm>
    </Create>
  )
}

export const CourseList = () => {
  return (
    <List>
      <Datagrid rowClick="edit">
        <NumberField source="id" />
        <TextField source="title" />
        <TextField source="imageSrc" />
      </Datagrid>
    </List>
  )
}

export const CourseEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <NumberInput source="id" validate={[required()]} label="Id" />
        <TextInput source="title" validate={[required()]} label="Title" />
        <TextInput source="imageSrc" validate={[required()]} label="Image" />
      </SimpleForm>
    </Edit>
  )
}
