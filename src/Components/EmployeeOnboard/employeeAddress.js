import React from 'react'
import { Alert, Autocomplete, Avatar, Checkbox, CircularProgress, FormControl, FormControlLabel, FormHelperText, Grid, IconButton, InputLabel, MenuItem, Select, Snackbar, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Controller } from 'react-hook-form';



const EmployeeAddress = ({
  copyToPermanent,handleCheckboxChange2,MultilineTextField,

  control,StyledLabel,
  formData3, StyledInput, errors, openEdit, setFormData3
}) => {
  return (
    <Grid container>

      <Grid container xs={6} >
        <Grid container xs={12} alignItems="center" paddingBottom={3}>
          <Grid item xs={4}>
            <StyledLabel>
              Current Address <span style={{ color: 'red' }}>*</span>
            </StyledLabel>
          </Grid>
          <Grid item xs={7}>
            <Controller
              name="currentaddress"
              control={control}
              defaultValue={formData3.currentaddress || ''}
              render={({ field }) => (
                <MultilineTextField
                  fullWidth
                  multiline
                  rows={4}
                  {...field}
                  variant="outlined"
                  error={!!errors.currentaddress}
                  helperText={errors.currentaddress ? errors.currentaddress.message : ''}
                  FormHelperTextProps={{
                    style: { margin: 0, position: 'absolute', bottom: '-20px' }
                  }}
                  disabled={openEdit}
                  onChange={(e) => {
                    field.onChange(e);
                    setFormData3((prev) => ({
                      ...prev,
                      currentaddress: e.target.value,
                    }));
                  }} />
              )}
            />
          </Grid>

        </Grid>

        <Grid container xs={12} alignItems="center" paddingBottom={3}>
          <Grid item xs={4}>
            <StyledLabel>
              Current City <span style={{ color: 'red' }}>*</span>
            </StyledLabel>
          </Grid>
          <Grid item xs={7}>
            <Controller
              name="currentCity"
              control={control}
              defaultValue={formData3.currentCity}
              render={({ field }) => (
                <StyledInput
                  fullWidth
                  {...field}
                  variant="outlined"
                  error={!!errors.currentCity}
                  helperText={errors.currentCity ? errors.currentCity.message : ''}
                  FormHelperTextProps={{
                    style: { margin: 0, position: 'absolute', bottom: '-20px' }
                  }}
                  disabled={openEdit}
                  onChange={(e) => {
                    field.onChange(e);
                    setFormData3((prev) => ({
                      ...prev,
                      currentCity: e.target.value,
                    }));
                  }}
                />
              )}
            />
          </Grid>
        </Grid>


        <Grid container xs={12} alignItems="center" paddingBottom={3}>
          <Grid item xs={4}>
            <StyledLabel>
              Pincode <span style={{ color: 'red' }}>*</span>
            </StyledLabel>
          </Grid>
          <Grid item xs={7}>
            <Controller
              name="currentPincode"
              control={control}
              defaultValue={formData3.currentPincode}
              render={({ field }) => (
                <StyledInput
                  fullWidth
                  {...field}
                  variant="outlined"
                  error={!!errors.currentPincode}
                  helperText={errors.currentPincode ? errors.currentPincode.message : ''}
                  FormHelperTextProps={{
                    style: { margin: 0, position: 'absolute', bottom: '-20px' }
                  }}
                  disabled={openEdit}
                  onChange={(e) => {
                    field.onChange(e);
                    setFormData3((prev) => ({
                      ...prev,
                      currentPincode: e.target.value,
                    }));
                  }}
                />
              )}
            />
          </Grid>
        </Grid>

      </Grid>

      <Grid container xs={6} >
        <Grid container xs={12} alignItems="center" paddingBottom={3}>
          <Grid item xs={4}>
            <StyledLabel>
              Permanent Address <span style={{ color: 'red' }}>*</span>
            </StyledLabel>
          </Grid>
          <Grid item xs={7}>
            <Controller
              name="permanentAddress"
              control={control}
              defaultValue={formData3.permanentAddress}
              render={({ field }) => (
                <MultilineTextField
                  fullWidth
                  multiline
                  rows={4}
                  {...field}
                  variant="outlined"
                  error={!!errors.permanentAddress}
                  helperText={errors.permanentAddress ? errors.permanentAddress.message : ''}
                  FormHelperTextProps={{
                    style: { margin: 0, position: 'absolute', bottom: '-20px' }
                  }}
                  disabled={openEdit}
                  onChange={(e) => {
                    field.onChange(e);
                    setFormData3((prev) => ({
                      ...prev,
                      permanentAddress: e.target.value,
                    }));
                  }}
                />
              )}
            />
          </Grid>
        </Grid>

        <Grid container xs={12} alignItems="center" paddingBottom={3}>
          <Grid item xs={4}>
            <StyledLabel>
              Permanent City <span style={{ color: 'red' }}>*</span>
            </StyledLabel>
          </Grid>

          <Grid item xs={7}>
            <Controller
              name="permanentcity"
              control={control}
              defaultValue={formData3.permanentcity}
              render={({ field }) => (
                <StyledInput
                  fullWidth
                  {...field}
                  variant="outlined"
                  error={!!errors.permanentcity}
                  helperText={errors.permanentcity ? errors.permanentcity.message : ''}
                  FormHelperTextProps={{
                    style: { margin: 0, position: 'absolute', bottom: '-20px' }
                  }}
                  disabled={openEdit}
                  onChange={(e) => {
                    field.onChange(e);
                    setFormData3((prev) => ({
                      ...prev,
                      permanentcity: e.target.value,
                    }));
                  }}
                />
              )}
            />
          </Grid>
        </Grid>

        <Grid container xs={12} alignItems="center" paddingBottom={3}>
          <Grid item xs={4}>
            <StyledLabel>
              Pincode <span style={{ color: 'red' }}>*</span>
            </StyledLabel>
          </Grid>
          <Grid item xs={7}>
            <Controller
              name="permanentPincode"
              control={control}
              defaultValue={formData3.permanentPincode}
              render={({ field }) => (
                <StyledInput
                  fullWidth
                  {...field}
                  variant="outlined"
                  error={!!errors.permanentPincode}
                  helperText={errors.permanentPincode ? errors.permanentPincode.message : ''}
                  FormHelperTextProps={{
                    style: { margin: 0, position: 'absolute', bottom: '-20px' }
                  }}
                  disabled={openEdit}
                  onChange={(e) => {
                    field.onChange(e);
                    setFormData3((prev) => ({
                      ...prev,
                      permanentPincode: e.target.value,
                    }));
                  }}
                />

              )}
            />
          </Grid>
        </Grid>


      </Grid>

      <Grid container alignItems="center" paddingBottom={3}>
        <Grid item xs={4}>
          <FormControlLabel
            control={
              <Checkbox
                checked={copyToPermanent}
                onChange={handleCheckboxChange2}
                disabled={!(formData3.currentaddress && formData3.currentCity && formData3.currentPincode) || openEdit }
              />
            }
            label="Same as Current Address"
          />
        </Grid>
      </Grid>

    </Grid>
  )
}

export default EmployeeAddress
