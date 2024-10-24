import React from 'react'
import { Alert, Autocomplete, Avatar, Checkbox, CircularProgress, FormControl, FormControlLabel, FormHelperText, Grid, IconButton, InputLabel, MenuItem, Select, Snackbar, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Controller } from 'react-hook-form';



const EmployeePaymentMode = ({
  formData1,selectedPaymentType,handlePaymentTypeChange,

  control, StyledLabel,
  formData6, StyledInput, errors, openEdit, setFormData6

}) => {


  return (
    <Grid container>
      <Grid container xs={3}>
        <Grid>

        </Grid>
      </Grid>
      <Grid container xs={6} >
        <Grid container alignItems="center" paddingBottom={2}>
          <Grid item xs={4}>
            <StyledLabel>
              Mention the mode of payment <span style={{ color: 'red' }}>*</span>
            </StyledLabel>
          </Grid>
          <Grid item xs={7}>
            <Controller
              name="modeofpayment"
              control={control}
              defaultValue={formData6.modeofpayment}
              disabled={openEdit}
              render={({ field }) => (
                <FormControl fullWidth variant="outlined" margin="normal" error={!!errors.modeofpayment}>
                  <InputLabel>
                    Payment Type <span style={{ color: 'red' }}>*</span>
                  </InputLabel>
                  <Select
                    {...field}
                    value={selectedPaymentType}
                    onChange={(e) => {
                      field.onChange(e);
                      handlePaymentTypeChange(e);
                      setFormData6((prev) => ({
                        ...prev,
                        modeofpayment: e.target.value,
                      }));
                    }}
                    label="Payment Type"
                  >
                    <MenuItem value="cash">Cash</MenuItem>
                    <MenuItem value="banktransfer">Bank Transfer</MenuItem>
                    <MenuItem value="cheque">Cheque</MenuItem>
                    <MenuItem value="demanddraft">Demand Draft</MenuItem>
                  </Select>
                  <FormHelperText>
                    {errors.modeofpayment ? errors.modeofpayment.message : ''}
                  </FormHelperText>
                </FormControl>
              )}
            />
          </Grid>

          <Grid container alignItems="center" paddingBottom={2}>

            <Grid container alignItems="center" paddingBottom={2}>
              <Grid item xs={4}>
                <StyledLabel>
                  Beneficiary Code <span style={{ color: 'red' }}>*</span>
                </StyledLabel>
              </Grid>

              <Grid item xs={0}>
                <StyledLabel>
                  :
                </StyledLabel>
              </Grid>

              <Grid item xs={0} alignItems='flex-start'>
                <StyledLabel>
                  {`${formData1?.firstname?.replace(/\s+/g, '')}${formData1?.lastname?.replace(/\s+/g, '')}${formData1?.employeeNumber}${formData1?.dateOfJoining?.replace(/-/g, '')}`}
                </StyledLabel>
              </Grid>
            </Grid>

          </Grid>

          <Grid container alignItems="center" paddingBottom={2}>

            {selectedPaymentType === 'banktransfer' && (

              <Grid container paddingTop={2}>

                <Grid container alignItems="center" paddingBottom={2}>
                  <Grid item xs={4}>
                    <StyledLabel>
                      Bank Name <span style={{ color: 'red' }}>*</span>
                    </StyledLabel>
                  </Grid>
                  <Grid item xs={7}>
                    <Controller
                      name="bankname"
                      control={control}
                      defaultValue={formData6.bankname}
                      render={({ field }) => (
                        <StyledInput
                          {...field}
                          variant="outlined"
                          fullWidth
                          error={!!errors.bankname}
                          helperText={errors.bankname ? errors.bankname.message : ''}
                          FormHelperTextProps={{
                            style: { margin: 0, position: 'absolute', bottom: '-20px' }
                          }}
                          disabled={openEdit}
                          onChange={(e) => {
                            field.onChange(e);
                            setFormData6((prev) => ({
                              ...prev,
                              bankname: e.target.value,
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
                      Branch Name <span style={{ color: 'red' }}>*</span>
                    </StyledLabel>
                  </Grid>
                  <Grid item xs={7}>
                    <Controller
                      name="branchname"
                      control={control}
                      defaultValue={formData6.branchname}
                      render={({ field }) => (
                        <StyledInput
                          {...field}
                          variant="outlined"
                          fullWidth
                          error={!!errors.branchname}
                          helperText={errors.branchname ? errors.branchname.message : ''}
                          FormHelperTextProps={{
                            style: { margin: 0, position: 'absolute', bottom: '-20px' }
                          }}
                          disabled={openEdit}
                          onChange={(e) => {
                            field.onChange(e);
                            setFormData6((prev) => ({
                              ...prev,
                              branchname: e.target.value,
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
                      IFSC Code <span style={{ color: 'red' }}>*</span>
                    </StyledLabel>
                  </Grid>
                  <Grid item xs={7}>
                    <Controller
                      name="ifsccode"
                      control={control}
                      defaultValue={formData6.ifsccode}
                      render={({ field }) => (
                        <StyledInput
                          {...field}
                          variant="outlined"
                          fullWidth
                          error={!!errors.ifsccode}
                          helperText={errors.ifsccode ? errors.ifsccode.message : ''}
                          FormHelperTextProps={{
                            style: { margin: 0, position: 'absolute', bottom: '-20px' }
                          }}
                          disabled={openEdit}
                          onChange={(e) => {
                            field.onChange(e);
                            setFormData6((prev) => ({
                              ...prev,
                              ifsccode: e.target.value,
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
                      Account Number <span style={{ color: 'red' }}>*</span>
                    </StyledLabel>
                  </Grid>
                  <Grid item xs={7}>
                    <Controller
                      name="accountNumber"
                      control={control}
                      defaultValue={formData6.accountNumber}
                      render={({ field }) => (
                        <StyledInput
                          {...field}
                          variant="outlined"
                          fullWidth
                          error={!!errors.accountNumber}
                          helperText={errors.accountNumber ? errors.accountNumber.message : ''}
                          FormHelperTextProps={{
                            style: { margin: 0, position: 'absolute', bottom: '-20px' }
                          }}
                          disabled={openEdit}
                          onChange={(e) => {
                            field.onChange(e);
                            setFormData6((prev) => ({
                              ...prev,
                              accountNumber: e.target.value,
                            }));
                          }}
                        />
                      )}
                    />
                  </Grid>
                </Grid>

              </Grid>

            )}
          </Grid>

        </Grid>

      </Grid>
    </Grid>
  )
}

export default EmployeePaymentMode
