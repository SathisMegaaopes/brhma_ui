import React from 'react'
import { Autocomplete, FormHelperText, Grid, MenuItem } from '@mui/material';
import { Controller } from 'react-hook-form';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import Button from '@mui/material/Button';


const EmployeePosition = ({
  StyledLabel, control, mapOptions, designation, departments, teams, employees, grade, uploadStatus, uploadFileName,
  formData2, StyledInput, errors, openEdit, setFormData2, employeeMap, handleProofUpload, shifts, mapShiftOptions
}) => {


  return (
    <Grid container>
      <Grid container xs={4} bgcolor={''}> {/* First vertical page 2 Container */}

        <Grid container alignItems="center" paddingBottom={2}>
          <Grid item xs={4}>
            <StyledLabel>
              Reporting Manager <span style={{ color: 'red' }}>*</span>
            </StyledLabel>
          </Grid>

          <Grid item xs={7}>

            <Controller
              name="reportingmanager"
              control={control}
              defaultValue={formData2.reportingmanager || ''}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  options={employeeMap(employees)}
                  isOptionEqualToValue={(option, value) => option.value === value}
                  disabled={openEdit}
                  onChange={(event, value) => {
                    const newValue = value ? value.value : null;
                    setFormData2((prevData) => ({
                      ...prevData,
                      reportingmanager: newValue,
                    }));
                    field.onChange(newValue);
                  }}
                  renderInput={(params) => (
                    <StyledInput
                      {...params}
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={!!errors.reportingmanager}
                      helperText={errors.reportingmanager ? errors.reportingmanager.message : ''}
                      FormHelperTextProps={{
                        style: { margin: 0, position: 'absolute', bottom: '-20px' }
                      }}
                    />
                  )}
                />
              )}
            />

          </Grid>
        </Grid>

        <Grid container alignItems="center" paddingBottom={2}>
          <Grid item xs={4}>
            <StyledLabel>
              Reporting Team Lead <span style={{ color: 'red' }}>*</span>
            </StyledLabel>
          </Grid>
          <Grid item xs={7}>
            <Controller
              name="reportingteamlead"
              control={control}
              defaultValue={formData2.reportingteamlead || ''}
              render={({ field }) => (

                <Autocomplete
                  {...field}
                  options={employeeMap(employees)}
                  isOptionEqualToValue={(option, value) => option.value === value}
                  onChange={(event, value) => {
                    const newValue = value ? value.value : null;
                    setFormData2((prevData) => ({
                      ...prevData,
                      reportingteamlead: newValue,
                    }));
                    field.onChange(newValue);
                  }}
                  disabled={openEdit}
                  renderInput={(params) => (
                    <StyledInput
                      {...params}
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={!!errors.reportingteamlead}
                      helperText={errors.reportingteamlead ? errors.reportingteamlead.message : ''}
                      FormHelperTextProps={{
                        style: { margin: 0, position: 'absolute', bottom: '-20px' }
                      }}
                    />
                  )}
                />
              )}
            />
          </Grid>
        </Grid>

        <Grid container alignItems="center" paddingBottom={2}>
          <Grid item xs={4}>
            <StyledLabel>
              Designation <span style={{ color: 'red' }}>*</span>
            </StyledLabel>
          </Grid>
          <Grid item xs={7}>
            <Controller
              name="designation"
              control={control}
              defaultValue={formData2.designation || ''}
              render={({ field }) => (

                <Autocomplete
                  {...field}
                  options={mapOptions(designation)}
                  onChange={(event, value) => {
                    const newValue = value ? value.value : null;
                    setFormData2((prevData) => ({
                      ...prevData,
                      designation: newValue,
                    }));
                    field.onChange(newValue);
                  }}
                  disabled={openEdit}
                  isOptionEqualToValue={(option, value) => option.value === value}
                  renderInput={(params) => (
                    <StyledInput
                      {...params}
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={!!errors.designation}
                      helperText={errors.designation ? errors.designation.message : ''}
                      FormHelperTextProps={{
                        style: { margin: 0, position: 'absolute', bottom: '-20px' }
                      }}
                    />
                  )}
                />
              )}
            />
          </Grid>
        </Grid>

        <Grid container alignItems="center" paddingBottom={2}>
          <Grid item xs={4}>
            <StyledLabel>
              Department <span style={{ color: 'red' }}>*</span>
            </StyledLabel>
          </Grid>
          <Grid item xs={7}>
            <Controller
              name="department"
              control={control}
              defaultValue={formData2.department || ''}
              render={({ field }) => (

                <Autocomplete
                  {...field}
                  options={mapOptions(departments)}
                  onChange={(event, value) => {
                    const newValue = value ? value.value : null;
                    setFormData2((prevData) => ({
                      ...prevData,
                      department: newValue,
                    }));
                    field.onChange(newValue);
                  }}
                  disabled={openEdit}
                  isOptionEqualToValue={(option, value) => option.value === value}
                  renderInput={(params) => (
                    <StyledInput
                      {...params}
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={!!errors.department}
                      helperText={errors.department ? errors.department.message : ''}
                      FormHelperTextProps={{
                        style: { margin: 0, position: 'absolute', bottom: '-20px' }
                      }}
                    />
                  )}
                />
              )}
            />
          </Grid>
        </Grid>

        <Grid container alignItems="center" paddingBottom={2}>
          <Grid item xs={4}>
            <StyledLabel>
              Team <span style={{ color: 'red' }}>*</span>
            </StyledLabel>
          </Grid>
          <Grid item xs={7}>
            <Controller
              name="team"
              control={control}
              defaultValue={formData2.team || ''}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  options={mapOptions(teams)}
                  onChange={(event, value) => {
                    const newValue = value ? value.value : null;
                    setFormData2((prevData) => ({
                      ...prevData,
                      team: newValue,
                    }));
                    field.onChange(newValue);
                  }}
                  isOptionEqualToValue={(option, value) => option.value === value}
                  disabled={openEdit}
                  renderInput={(params) => (
                    <StyledInput
                      {...params}
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={!!errors.team}
                      helperText={errors.team ? errors.team.message : ''}
                      FormHelperTextProps={{
                        style: { margin: 0, position: 'absolute', bottom: '-20px' }
                      }}
                    />
                  )}
                />
              )}
            />
          </Grid>
        </Grid>


        <Grid container alignItems="center" paddingBottom={2}>
          <Grid item xs={4}>
            <StyledLabel>
              Referred By <span style={{ color: 'red' }}>*</span>
            </StyledLabel>
          </Grid>
          <Grid item xs={7}>
            <Controller
              name="referrdby"
              control={control}
              defaultValue={formData2.referrdby || ''}
              render={({ field }) => (

                <Autocomplete
                  {...field}
                  options={employeeMap(employees)}
                  onChange={(event, value) => {
                    const newValue = value ? value.value : null;
                    setFormData2((prevData) => ({
                      ...prevData,
                      referrdby: newValue,
                    }));
                    field.onChange(newValue);
                  }}
                  disabled={openEdit}
                  isOptionEqualToValue={(option, value) => option.value === value}
                  renderInput={(params) => (
                    <StyledInput
                      {...params}
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={!!errors.referrdby}
                      helperText={errors.referrdby ? errors.referrdby.message : ''}
                      FormHelperTextProps={{
                        style: { margin: 0, position: 'absolute', bottom: '-20px' }
                      }}
                    />
                  )}
                />
              )}
            />
          </Grid>
        </Grid>


        <Grid container alignItems="center" paddingBottom={2}>
          <Grid item xs={4}>
            <StyledLabel>
              Employment Status <span style={{ color: 'red' }}>*</span>
            </StyledLabel>
          </Grid>
          <Grid item xs={7}>
            <Controller
              name="employmentstatus"
              control={control}
              defaultValue={formData2.employmentstatus}
              render={({ field }) => (
                <StyledInput
                  {...field}
                  select
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={!!errors.employmentstatus}
                  helperText={errors.employmentstatus ? errors.employmentstatus.message : ''}
                  FormHelperTextProps={{
                    style: { margin: 0, position: 'absolute', bottom: '-20px' }
                  }}
                  disabled={openEdit}
                  onChange={(e) => {
                    field.onChange(e);
                    setFormData2((prev) => ({
                      ...prev,
                      employmentstatus: e.target.value,
                    }));
                  }}

                >
                  {/* <MenuItem value="Probation">Probation</MenuItem>
                    <MenuItem value="Confirmed">Confirmed</MenuItem> */}
                  <MenuItem value={0}>Probation</MenuItem>
                  <MenuItem value={1}>Confirmed</MenuItem>
                </StyledInput>
              )}
            />
          </Grid>
        </Grid>

      </Grid>

      <Grid container xs={4} bgcolor={''}> {/* Second vertical page 2 Container */}

        <Grid container alignItems="center" paddingBottom={2}>
          <Grid item xs={4}>
            <StyledLabel>
              Employee Status <span style={{ color: 'red' }}>*</span>
            </StyledLabel>
          </Grid>
          <Grid item xs={7}>
            <Controller
              name="employeestatus"
              control={control}
              defaultValue={formData2.employeestatus}
              render={({ field }) => (
                <StyledInput
                  {...field}
                  select
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={!!errors.employeestatus}
                  helperText={errors.employeestatus ? errors.employeestatus.message : ''}
                  FormHelperTextProps={{
                    style: { margin: 0, position: 'absolute', bottom: '-20px' }
                  }}
                  disabled={openEdit}
                  onChange={(e) => {
                    field.onChange(e);
                    setFormData2((prev) => ({
                      ...prev,
                      employeestatus: e.target.value,
                    }));
                  }}

                >
                  {/* <MenuItem value="Active">Active</MenuItem>
                    <MenuItem value="In Active">In Active</MenuItem> */}
                  <MenuItem value={1}>Active</MenuItem>
                  <MenuItem value={0}>In Active</MenuItem>
                </StyledInput>
              )}
            />
          </Grid>
        </Grid>

        <Grid container alignItems="center" paddingBottom={2}>
          <Grid item xs={4}>
            <StyledLabel>
              Shift <span style={{ color: 'red' }}>*</span>
            </StyledLabel>
          </Grid>
          <Grid item xs={7}>
            <Controller
              name="shift"
              control={control}
              defaultValue={formData2.shift}
              render={({ field }) => (

                <Autocomplete
                  {...field}
                  options={mapShiftOptions(shifts)}
                  onChange={(event, value) => {
                    const newValue = value ? value.value : null;
                    setFormData2((prevData) => ({
                      ...prevData,
                      shift: newValue,
                    }));
                    field.onChange(newValue);
                  }}
                  disabled={openEdit}
                  isOptionEqualToValue={(option, value) => option.value === value}
                  renderInput={(params) => (
                    <StyledInput
                      {...params}
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={!!errors.shift}
                      helperText={errors.shift ? errors.shift.message : ''}
                      FormHelperTextProps={{
                        style: { margin: 0, position: 'absolute', bottom: '-20px' }
                      }}
                    />
                  )}
                />
              )}
            />
          </Grid>
        </Grid>

        <Grid container alignItems="center" paddingBottom={2}>
          <Grid item xs={4}>
            <StyledLabel>
              Grade <span style={{ color: 'red' }}>*</span>
            </StyledLabel>
          </Grid>
          <Grid item xs={7}>
            <Controller
              name="grade"
              control={control}
              defaultValue={formData2.grade}
              render={({ field }) => (
                <StyledInput
                  {...field}
                  select
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={!!errors.grade}
                  helperText={errors.grade ? errors.grade.message : ''}
                  FormHelperTextProps={{
                    style: { margin: 0, position: 'absolute', bottom: '-20px' }
                  }}
                  disabled={openEdit}
                  onChange={(e) => {
                    field.onChange(e);
                    setFormData2((prev) => ({
                      ...prev,
                      grade: e.target.value,
                    }));
                  }}
                >
                  {grade?.map(item => (
                    <MenuItem key={item.name} value={item.name}>{item.name}</MenuItem>
                  ))}
                </StyledInput>
              )}
            />
          </Grid>
        </Grid>

        <Grid container alignItems="center" paddingBottom={2}>
          <Grid item xs={4}>
            <StyledLabel>
              Probation Period <span style={{ color: 'red' }}>*</span>
            </StyledLabel>
          </Grid>
          <Grid item xs={7}>
            <Controller
              name="probabationperiod"
              control={control}
              defaultValue={formData2.probabationperiod}
              render={({ field }) => (
                <StyledInput
                  {...field}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={!!errors.probabationperiod}
                  helperText={errors.probabationperiod ? errors.probabationperiod.message : ''}
                  FormHelperTextProps={{
                    style: { margin: 0, position: 'absolute', bottom: '-20px' }
                  }}
                  disabled={openEdit}
                  onChange={(e) => {
                    field.onChange(e);
                    setFormData2((prev) => ({
                      ...prev,
                      probabationperiod: e.target.value,
                    }));
                  }}
                />
              )}
            />
          </Grid>
        </Grid>

        <Grid container alignItems="center" paddingBottom={2}>
          <Grid item xs={4}>
            <StyledLabel>
              Salary Offered <span style={{ color: 'red' }}>*</span>
            </StyledLabel>
          </Grid>
          <Grid item xs={7}>
            <Controller
              name="salaryofferred"
              control={control}
              defaultValue={formData2.salaryofferred}
              render={({ field }) => (
                <StyledInput
                  {...field}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={!!errors.salaryofferred}
                  helperText={errors.salaryofferred ? errors.salaryofferred.message : ''}
                  FormHelperTextProps={{
                    style: { margin: 0, position: 'absolute', bottom: '-20px' }
                  }}
                  disabled={openEdit}
                  onChange={(e) => {
                    field.onChange(e);
                    setFormData2((prev) => ({
                      ...prev,
                      salaryofferred: e.target.value,
                    }));
                  }}
                />
              )}
            />
          </Grid>
        </Grid>

        <Grid container alignItems="center" paddingBottom={2}>
          <Grid item xs={4}>
            <StyledLabel>
              Attendance Bonus <span style={{ color: 'red' }}>*</span>
            </StyledLabel>
          </Grid>
          <Grid item xs={7}>
            <Controller
              name="attendancebonus"
              control={control}
              defaultValue={formData2.attendancebonus}
              render={({ field }) => (
                <StyledInput
                  {...field}
                  select
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={!!errors.attendancebonus}
                  helperText={errors.attendancebonus ? errors.attendancebonus.message : ''}
                  FormHelperTextProps={{
                    style: { margin: 0, position: 'absolute', bottom: '-20px' }
                  }}
                  disabled={openEdit}
                  onChange={(e) => {
                    field.onChange(e);
                    setFormData2((prev) => ({
                      ...prev,
                      attendancebonus: e.target.value,
                    }));
                  }}
                >
                  {/* <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem> */}
                  <MenuItem value={1}>Yes</MenuItem>
                  <MenuItem value={0}>No</MenuItem>
                </StyledInput>
              )}
            />
          </Grid>
        </Grid>

      </Grid>

      <Grid container xs={4} bgcolor={''}> {/* Third vertical page 2 Container */}

        <Grid container alignItems="center" paddingBottom={2}>
          <Grid item xs={4}>
            <StyledLabel>
              Total Monthly CTC <span style={{ color: 'red' }}>*</span>
            </StyledLabel>
          </Grid>
          <Grid item xs={7}>
            <Controller
              name="totalmonthlyctc"
              control={control}
              defaultValue={formData2.totalmonthlyctc}
              render={({ field }) => (
                <StyledInput
                  {...field}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={!!errors.totalmonthlyctc}
                  helperText={errors.totalmonthlyctc ? errors.totalmonthlyctc.message : ''}
                  disabled
                  FormHelperTextProps={{
                    style: { margin: 0, position: 'absolute', bottom: '-20px' }
                  }}
                  onChange={(e) => {
                    field.onChange(e);
                    setFormData2((prev) => ({
                      ...prev,
                      totalmonthlyctc: e.target.value,
                    }));
                  }}

                />
              )}
            />
          </Grid>
        </Grid>

        <Grid container alignItems="center" paddingBottom={2}>
          <Grid item xs={4}>
            <StyledLabel>
              Total Yearly CTC <span style={{ color: 'red' }}>*</span>
            </StyledLabel>
          </Grid>
          <Grid item xs={7}>
            <Controller
              name="totalyearlyctc"
              control={control}
              defaultValue={formData2.totalyearlyctc}
              render={({ field }) => (
                <StyledInput
                  {...field}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={!!errors.totalyearlyctc}
                  helperText={errors.totalyearlyctc ? errors.totalyearlyctc.message : ''}
                  disabled
                  FormHelperTextProps={{
                    style: { margin: 0, position: 'absolute', bottom: '-20px' }
                  }}
                  onChange={(e) => {
                    field.onChange(e);
                    setFormData2((prev) => ({
                      ...prev,
                      totalyearlyctc: e.target.value,
                    }));
                  }}

                />
              )}
            />
          </Grid>
        </Grid>

        <Grid container alignItems="center" paddingBottom={2}>
          <Grid item xs={4}>
            <StyledLabel>
              Billable Status <span style={{ color: 'red' }}>*</span>
            </StyledLabel>
          </Grid>
          <Grid item xs={7}>
            <Controller
              name="billablestatus"
              control={control}
              defaultValue={formData2.billablestatus}
              render={({ field }) => (
                <StyledInput
                  {...field}
                  select
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  error={!!errors.billablestatus}
                  helperText={errors.billablestatus ? errors.billablestatus.message : ''}
                  FormHelperTextProps={{
                    style: { margin: 0, position: 'absolute', bottom: '-20px' }
                  }}
                  disabled={openEdit}
                  onChange={(e) => {
                    field.onChange(e);
                    setFormData2((prev) => ({
                      ...prev,
                      billablestatus: e.target.value,
                    }));
                  }}
                >
                  {/* <MenuItem value="Billable">Billable</MenuItem>
                    <MenuItem value="Non-Billable">Non-Billable</MenuItem>
                    <MenuItem value="Partially">Partially Billed</MenuItem> */}
                  <MenuItem value={0}>Billable</MenuItem>
                  <MenuItem value={1}>Non-Billable</MenuItem>
                  <MenuItem value={2}>Partially Billed</MenuItem>
                </StyledInput>
              )}
            />
          </Grid>
        </Grid>

        {/* {(insertRequest === 1 || insertRequest === 2) && */}

        <Grid container alignItems="center" paddingBottom={2}>
          <Grid item xs={4}>
            <StyledLabel>
              Upload Address Proof <span style={{ color: 'red' }}>*</span>
            </StyledLabel>
          </Grid>
          <Grid item xs={7}>
            <Controller
              name="fileupload"
              control={control}
              defaultValue={formData2.addresprofpath}
              render={({ field }) => (
                <div>
                  <Button
                    variant="outlined"
                    component="label"
                    fullWidth
                    color="primary"
                    style={{ marginBottom: '3px' }}
                    disabled={openEdit}
                  >
                    {uploadStatus ? 'File Uploaded' : 'Upload File'}
                    <input
                      type="file"
                      hidden
                      onChange={(e) => { handleProofUpload(e) }}
                    />

                    {uploadFileName && (
                      uploadStatus ? <CheckCircleIcon style={{ color: 'green', marginLeft: '12px' }} /> :
                        <CancelIcon style={{ color: 'red', marginLeft: '12px' }} />
                    )}

                  </Button>

                  <FormHelperText style={{ color: errors.fileupload ? 'red' : 'inherit' }}>
                    {errors.fileupload?.message ? ` - ${errors.fileupload.message}` : uploadFileName ? uploadFileName : 'No file selected'}
                  </FormHelperText>
                </div>
              )}
            />
          </Grid>
        </Grid>

        {/* } */}


      </Grid>
    </Grid>
  )
}

export default EmployeePosition
