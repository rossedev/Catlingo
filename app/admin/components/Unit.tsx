import {
  Create,
  Datagrid,
  Edit,
  List,
  NumberField,
  NumberInput,
  ReferenceField,
  ReferenceInput,
  SimpleForm,
  TextField,
  TextInput,
  required,
} from 'react-admin'

export const UnitCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="title" validate={[required()]} label="Title" />
        <TextInput
          source="description"
          validate={[required()]}
          label="Description"
        />
        <ReferenceInput source="courseId" reference="courses" />

        <NumberInput source="order" validate={[required()]} label="Order" />
      </SimpleForm>
    </Create>
  )
}

export const UnitList = () => {
  return (
    <List>
      <Datagrid rowClick="edit">
        <NumberField source="id" />
        <TextField source="title" />
        <TextField source="description" />
        <ReferenceField source="courseId" reference="courses" />
        <NumberField source="order" />
      </Datagrid>
    </List>
  )
}

export const UnitEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <NumberInput source="id" validate={[required()]} label="Id" />
        <TextInput source="title" validate={[required()]} label="Title" />
        <TextInput
          source="description"
          validate={[required()]}
          label="Description"
        />
        <ReferenceInput source="courseId" reference="courses" />
        <NumberInput source="order" validate={[required()]} label="Image" />
      </SimpleForm>
    </Edit>
  )
}
