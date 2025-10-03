# Unused codes in StaffLogin view 

## loginSchema
### 1.0: simple email pattern checker 
```javascript
const loginSchema = computed(() => {
  return yup.object({
    email: yup
      .string()
      .required('Email or Staff ID is required')
      .test('email-or-staff-id', 'Must be a valid email or Staff ID', (value) => {
        if (!value) return false;
        
        // Check if it matches staff ID pattern (HER-2025-H-0001)
        const staffIdPattern = /^[A-Z]{3}-\d{4}-[A-Z]-\d{4}$/;
        if (staffIdPattern.test(value)) {
          return true;
        }
        
        // Check if it's a valid email with allowed domain
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailPattern.test(value)) {
          const domain = value.split('@')[1];
          const allowedDomains = ['company.com', 'example.com'];
          return allowedDomains.includes(domain);
        }
        
        return false;
      }),
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .minUppercase(1, 'Password must contain at least one uppercase')
      .minLowercase(1, 'Password must contain at least one lowercase')
      .minSymbols('1', 'Password must contain at least one special character'),
  })
})
```
