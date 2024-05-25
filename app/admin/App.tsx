'use client'

import { Admin, Resource } from 'react-admin'
import simpleRestProvider from 'ra-data-simple-rest'
import { CourseCreate, CourseEdit, CourseList } from './components/Course'
import { UnitCreate, UnitEdit, UnitList } from './components/Unit'
import { LessonCreate, LessonEdit, LessonList } from './components/Lesson'
import {
  ChallengeCreate,
  ChallengeEdit,
  ChallengeList,
} from './components/Challenge'
import {
  ChallengeOptionCreate,
  ChallengeOptionEdit,
  ChallengeOptionList,
} from './components/ChallengeOptions'

const dataProvider = simpleRestProvider('/api')

const App = () => {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource
        name="courses"
        list={CourseList}
        create={CourseCreate}
        edit={CourseEdit}
        recordRepresentation="title"
      />
      <Resource
        name="units"
        list={UnitList}
        create={UnitCreate}
        edit={UnitEdit}
        recordRepresentation="title"
      />
      <Resource
        name="lessons"
        list={LessonList}
        create={LessonCreate}
        edit={LessonEdit}
        recordRepresentation="title"
      />
      <Resource
        name="challenges"
        list={ChallengeList}
        create={ChallengeCreate}
        edit={ChallengeEdit}
        recordRepresentation="question"
      />
      <Resource
        name="challengeOptions"
        options={{ label: 'Challenge Options' }}
        list={ChallengeOptionList}
        create={ChallengeOptionCreate}
        edit={ChallengeOptionEdit}
        recordRepresentation="title"
      />
    </Admin>
  )
}

export default App
