import React from 'react'
import { Alert, Autocomplete, Avatar, Checkbox, CircularProgress, FormControl, FormControlLabel, FormHelperText, Grid, IconButton, InputLabel, MenuItem, Select, Snackbar, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Controller } from 'react-hook-form';



const EmployeeExperience = ({

  control, StyledLabel, insertRequest,
  formData4, StyledInput, errors, openEdit, setFormData4

}) => {

  return (
    <Grid container >

      <Grid container xs={12} bgcolor={''} sx={{ borderBottom: insertRequest === 0 ? '' : '1px solid black', width: '20%' }}> {/* First Horizontal view page - 3 container */}

        <Grid container xs={12} alignItems="center" paddingBottom={2}> {/*This is the empty oness... */}
          <Grid item xs={4}>
          </Grid>
          <Grid item xs={7}>
          </Grid>
        </Grid>


        <Grid container xs={4} alignItems="center" paddingBottom={2}>
          <Grid item xs={4}>
            <StyledLabel>
              Previous Organization Name 1
            </StyledLabel>
          </Grid>
          <Grid item xs={7}>
            <Controller
              name="organization1"
              control={control}
              defaultValue={formData4.organization1}
              render={({ field }) => (
                <StyledInput
                  fullWidth
                  {...field}
                  variant="outlined"
                  error={!!errors.organization1}
                  helperText={errors.organization1 ? errors.organization1.message : ''}
                  FormHelperTextProps={{
                    style: { margin: 0, position: 'absolute', bottom: '-20px' }
                  }}
                  disabled={openEdit}
                  onChange={(e) => {
                    field.onChange(e);
                    setFormData4((prev) => ({
                      ...prev,
                      organization1: e.target.value,
                    }));
                  }}
                />
              )}
            />
          </Grid>
        </Grid>


        <Grid container xs={4} alignItems="center" paddingBottom={2}>
          <Grid item xs={4}>
            <StyledLabel>
              Designation
            </StyledLabel>
          </Grid>
          <Grid item xs={7}>
            <Controller
              name="designation1"
              control={control}
              defaultValue={formData4.designation1}
              render={({ field }) => (
                <StyledInput
                  fullWidth
                  {...field}
                  variant="outlined"
                  error={!!errors.designation1}
                  helperText={errors.designation1 ? errors.designation1.message : ''}
                  FormHelperTextProps={{
                    style: { margin: 0, position: 'absolute', bottom: '-20px' }
                  }}
                  disabled={openEdit}
                  onChange={(e) => {
                    field.onChange(e);
                    setFormData4((prev) => ({
                      ...prev,
                      designation1: e.target.value,
                    }));
                  }}
                />
              )}
            />
          </Grid>
        </Grid>


        <Grid container xs={4} alignItems="center" paddingBottom={2}>
          <Grid item xs={4}>
            <StyledLabel>
              Start Date
            </StyledLabel>
          </Grid>
          <Grid item xs={7}>
            <Controller
              name="startdate1"
              control={control}
              defaultValue={formData4.startdate1}
              render={({ field }) => (
                <StyledInput
                  fullWidth
                  {...field}
                  variant="outlined"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.startdate1}
                  helperText={errors.startdate1 ? errors.startdate1.message : ''}
                  FormHelperTextProps={{
                    style: { margin: 0, position: 'absolute', bottom: '-20px' }
                  }}
                  disabled={openEdit}
                  onChange={(e) => {
                    field.onChange(e);
                    setFormData4((prev) => ({
                      ...prev,
                      startdate1: e.target.value,
                    }));
                  }}
                />
              )}
            />
          </Grid>
        </Grid>


        <Grid container xs={4} alignItems="center" paddingBottom={2}>
          <Grid item xs={4}>
            <StyledLabel>
              End Date
            </StyledLabel>
          </Grid>
          <Grid item xs={7}>
            <Controller
              name="enddate1"
              control={control}
              defaultValue={formData4.enddate1}
              render={({ field }) => (
                <StyledInput
                  fullWidth
                  {...field}
                  variant="outlined"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.enddate1}
                  helperText={errors.enddate1 ? errors.enddate1.message : ''}
                  FormHelperTextProps={{
                    style: { margin: 0, position: 'absolute', bottom: '-20px' }
                  }}
                  disabled={openEdit}
                  onChange={(e) => {
                    field.onChange(e);
                    setFormData4((prev) => ({
                      ...prev,
                      enddate1: e.target.value,
                    }));
                  }}
                />
              )}
            />
          </Grid>
        </Grid>

        <Grid container xs={4} alignItems="center" paddingBottom={2}>
          <Grid item xs={4}>
            <StyledLabel>
              Total Experience ( In Years)
            </StyledLabel>
          </Grid>
          <Grid item xs={7}>
            <Controller
              name="totalExperience1"
              control={control}
              defaultValue={formData4.totalExperience1}
              render={({ field }) => (
                <StyledInput
                  fullWidth
                  {...field}
                  variant="outlined"
                  error={!!errors.totalExperience1}
                  helperText={errors.totalExperience1 ? errors.totalExperience1.message : ''}
                  disabled
                  FormHelperTextProps={{
                    style: { margin: 0, position: 'absolute', bottom: '-20px' }
                  }}
                  onChange={(e) => {
                    field.onChange(e);
                    setFormData4((prev) => ({
                      ...prev,
                      totalExperience1: e.target.value,
                    }));
                  }}
                />
              )}
            />
          </Grid>
        </Grid>


        <Grid container xs={12} alignItems="center" paddingBottom={2}> {/*This is the empty oness... */}
          <Grid item xs={4}>
          </Grid>
          <Grid item xs={7}>
          </Grid>
        </Grid>


      </Grid>

      <Grid container xs={12} bgcolor={''} sx={{  borderBottom: insertRequest === 0 ? '' : '1px solid black', width: '20%' }} > {/* Second Horizontal view page - 3 container */}


        <Grid container xs={12} alignItems="center" paddingBottom={2}> {/*This is the empty oness... */}
          <Grid item xs={4}>
          </Grid>
          <Grid item xs={7}>
          </Grid>
        </Grid>

        <Grid container xs={12} alignItems="center" paddingBottom={2}> {/*This is the empty oness... */}
          <Grid item xs={4}>
          </Grid>
          <Grid item xs={7}>
          </Grid>
        </Grid>

        <Grid container xs={4} alignItems="center" paddingBottom={2}>
          <Grid item xs={4}>
            <StyledLabel>
              Previous Organization Name 2
            </StyledLabel>
          </Grid>
          <Grid item xs={7}>
            <Controller
              name="organization2"
              control={control}
              defaultValue={formData4.organization2}
              render={({ field }) => (
                <StyledInput
                  fullWidth
                  {...field}
                  variant="outlined"
                  error={!!errors.organization2}
                  helperText={errors.organization2 ? errors.organization2.message : ''}
                  FormHelperTextProps={{
                    style: { margin: 0, position: 'absolute', bottom: '-20px' }
                  }}
                  disabled={openEdit}
                  onChange={(e) => {
                    field.onChange(e);
                    setFormData4((prev) => ({
                      ...prev,
                      organization2: e.target.value,
                    }));
                  }}
                />
              )}
            />
          </Grid>
        </Grid>

        <Grid container xs={4} alignItems="center" paddingBottom={2}>
          <Grid item xs={4}>
            <StyledLabel>
              Designation
            </StyledLabel>
          </Grid>
          <Grid item xs={7}>
            <Controller
              name="designation2"
              control={control}
              defaultValue={formData4.designation2}
              render={({ field }) => (
                <StyledInput
                  fullWidth
                  {...field}
                  variant="outlined"
                  error={!!errors.designation2}
                  helperText={errors.designation2 ? errors.designation2.message : ''}
                  FormHelperTextProps={{
                    style: { margin: 0, position: 'absolute', bottom: '-20px' }
                  }}
                  disabled={openEdit}
                  onChange={(e) => {
                    field.onChange(e);
                    setFormData4((prev) => ({
                      ...prev,
                      designation2: e.target.value,
                    }));
                  }}
                />
              )}
            />
          </Grid>
        </Grid>

        <Grid container xs={4} alignItems="center" paddingBottom={2}>
          <Grid item xs={4}>
            <StyledLabel>
              Start Date
            </StyledLabel>
          </Grid>
          <Grid item xs={7}>
            <Controller
              name="startdate2"
              control={control}
              defaultValue={formData4.startdate2}
              render={({ field }) => (
                <StyledInput
                  fullWidth
                  {...field}
                  variant="outlined"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.startdate2}
                  helperText={errors.startdate2 ? errors.startdate2.message : ''}
                  FormHelperTextProps={{
                    style: { margin: 0, position: 'absolute', bottom: '-20px' }
                  }}
                  disabled={openEdit}
                  onChange={(e) => {
                    field.onChange(e);
                    setFormData4((prev) => ({
                      ...prev,
                      startdate2: e.target.value,
                    }));
                  }}
                />
              )}
            />
          </Grid>
        </Grid>


        <Grid container xs={4} alignItems="center" paddingBottom={2}>
          <Grid item xs={4}>
            <StyledLabel>
              End Date
            </StyledLabel>
          </Grid>
          <Grid item xs={7}>
            <Controller
              name="enddate2"
              control={control}
              defaultValue={formData4.enddate2}
              render={({ field }) => (
                <StyledInput
                  fullWidth
                  {...field}
                  variant="outlined"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.enddate2}
                  helperText={errors.enddate2 ? errors.enddate2.message : ''}
                  FormHelperTextProps={{
                    style: { margin: 0, position: 'absolute', bottom: '-20px' }
                  }}
                  disabled={openEdit}
                  onChange={(e) => {
                    field.onChange(e);
                    setFormData4((prev) => ({
                      ...prev,
                      enddate2: e.target.value,
                    }));
                  }}
                />
              )}
            />
          </Grid>
        </Grid>

        <Grid container xs={4} alignItems="center" paddingBottom={2}>
          <Grid item xs={4}>
            <StyledLabel>
              Total Experience ( In Years)
            </StyledLabel>
          </Grid>
          <Grid item xs={7}>
            <Controller
              name="totalExperience2"
              control={control}
              defaultValue={formData4.totalExperience2}
              render={({ field }) => (
                <StyledInput
                  fullWidth
                  {...field}
                  variant="outlined"
                  error={!!errors.totalExperience2}
                  helperText={errors.totalExperience2 ? errors.totalExperience2.message : ''}
                  disabled
                  FormHelperTextProps={{
                    style: { margin: 0, position: 'absolute', bottom: '-20px' }
                  }}
                  onChange={(e) => {
                    field.onChange(e);
                    setFormData4((prev) => ({
                      ...prev,
                      totalExperience2: e.target.value,
                    }));
                  }}
                />
              )}
            />
          </Grid>
        </Grid>


        <Grid container xs={12} alignItems="center" paddingBottom={2}> {/*This is the empty oness... */}
          <Grid item xs={4}>
          </Grid>
          <Grid item xs={7}>
          </Grid>
        </Grid>

      </Grid>

      <Grid container xs={12} bgcolor={''}> {/* Third Horizontal view page - 3 container */}

        <Grid container xs={12} alignItems="center" paddingBottom={2}> {/*This is the empty oness... */}
          <Grid item xs={4}>
          </Grid>
          <Grid item xs={7}>
          </Grid>
        </Grid>

        <Grid container xs={12} alignItems="center" paddingBottom={2}> {/*This is the empty oness... */}
          <Grid item xs={4}>
          </Grid>
          <Grid item xs={7}>
          </Grid>
        </Grid>

        <Grid container xs={4} alignItems="center" paddingBottom={2}>
          <Grid item xs={4}>
            <StyledLabel>
              Previous Organization Name 3
            </StyledLabel>
          </Grid>
          <Grid item xs={7}>
            <Controller
              name="organization3"
              control={control}
              defaultValue={formData4.organization3}
              render={({ field }) => (
                <StyledInput
                  fullWidth
                  {...field}
                  variant="outlined"
                  error={!!errors.organization3}
                  helperText={errors.organization3 ? errors.organization3.message : ''}
                  FormHelperTextProps={{
                    style: { margin: 0, position: 'absolute', bottom: '-20px' }
                  }}
                  disabled={openEdit}
                  onChange={(e) => {
                    field.onChange(e);
                    setFormData4((prev) => ({
                      ...prev,
                      organization3: e.target.value,
                    }));
                  }}
                />
              )}
            />
          </Grid>
        </Grid>

        <Grid container xs={4} alignItems="center" paddingBottom={2}>
          <Grid item xs={4}>
            <StyledLabel>
              Designation
            </StyledLabel>
          </Grid>
          <Grid item xs={7}>
            <Controller
              name="designation3"
              control={control}
              defaultValue={formData4.designation3}
              render={({ field }) => (
                <StyledInput
                  fullWidth
                  {...field}
                  variant="outlined"
                  error={!!errors.designation3}
                  helperText={errors.designation3 ? errors.designation3.message : ''}
                  FormHelperTextProps={{
                    style: { margin: 0, position: 'absolute', bottom: '-20px' }
                  }}
                  disabled={openEdit}
                  onChange={(e) => {
                    field.onChange(e);
                    setFormData4((prev) => ({
                      ...prev,
                      designation3: e.target.value,
                    }));
                  }}
                />
              )}
            />
          </Grid>
        </Grid>

        <Grid container xs={4} alignItems="center" paddingBottom={2}>
          <Grid item xs={4}>
            <StyledLabel>
              Start Date
            </StyledLabel>
          </Grid>
          <Grid item xs={7}>
            <Controller
              name="startdate3"
              control={control}
              defaultValue={formData4.startdate3}
              render={({ field }) => (
                <StyledInput
                  fullWidth
                  {...field}
                  variant="outlined"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.startdate3}
                  helperText={errors.startdate3 ? errors.startdate3.message : ''}
                  FormHelperTextProps={{
                    style: { margin: 0, position: 'absolute', bottom: '-20px' }
                  }}
                  disabled={openEdit}
                  onChange={(e) => {
                    field.onChange(e);
                    setFormData4((prev) => ({
                      ...prev,
                      startdate3: e.target.value,
                    }));
                  }}
                />
              )}
            />
          </Grid>
        </Grid>

        <Grid container xs={4} alignItems="center" paddingBottom={2}>
          <Grid item xs={4}>
            <StyledLabel>
              End Date
            </StyledLabel>
          </Grid>
          <Grid item xs={7}>
            <Controller
              name="enddate3"
              control={control}
              defaultValue={formData4.enddate3}
              render={({ field }) => (
                <StyledInput
                  fullWidth
                  {...field}
                  variant="outlined"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  error={!!errors.enddate3}
                  helperText={errors.enddate3 ? errors.enddate3.message : ''}
                  FormHelperTextProps={{
                    style: { margin: 0, position: 'absolute', bottom: '-20px' }
                  }}
                  disabled={openEdit}
                  onChange={(e) => {
                    field.onChange(e);
                    setFormData4((prev) => ({
                      ...prev,
                      enddate3: e.target.value,
                    }));
                  }}
                />
              )}
            />
          </Grid>
        </Grid>

        <Grid container xs={4} alignItems="center" paddingBottom={2}>
          <Grid item xs={4}>
            <StyledLabel>
              Total Experience ( In Years)
            </StyledLabel>
          </Grid>
          <Grid item xs={7}>
            <Controller
              name="totalExperience3"
              control={control}
              defaultValue={formData4.totalExperience3}
              render={({ field }) => (
                <StyledInput
                  fullWidth
                  {...field}
                  variant="outlined"
                  error={!!errors.totalExperience3}
                  helperText={errors.totalExperience3 ? errors.totalExperience3.message : ''}
                  disabled
                  FormHelperTextProps={{
                    style: { margin: 0, position: 'absolute', bottom: '-20px' }
                  }}
                  onChange={(e) => {
                    field.onChange(e);
                    setFormData4((prev) => ({
                      ...prev,
                      totalExperience3: e.target.value,
                    }));
                  }}
                />
              )}
            />
          </Grid>
        </Grid>

      </Grid>

    </Grid>
  )
}

export default EmployeeExperience
