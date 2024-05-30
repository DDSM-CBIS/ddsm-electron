import { PatientType } from '../../types/patient';

export default function PatientContainer(props: PatientType) {
  const { patientId, calcCases, massCases } = props;
  return (
    <div>
      <h1>PatientContainer</h1>
    </div>
  );
}
