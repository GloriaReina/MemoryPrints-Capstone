// import { Button, Form, FormGroup, Label, Input } from "reactstrap";


//   return (
//     <Form onSubmit={registerClick}>
//       <fieldset>
//         <FormGroup>
//           <Label htmlFor="displayName">Display Name</Label>
//           <Input
//             id="displayName"
//             type="text"
//             onChange={(e) => setDisplayName(e.target.value)}
//           />
//         </FormGroup>
//         <FormGroup>
//           <Label htmlFor="imageLocation">Profile Image URL</Label>
//           <Input
//             id="imageLocation"
//             type="text"
//             onChange={(e) => setImageLocation(e.target.value)}
//           />
//         </FormGroup>
//         <FormGroup>
//           <Label htmlFor="firstName">First Name</Label>
//           <Input
//             id="firstName"
//             type="text"
//             onChange={(e) => setFirstName(e.target.value)}
//           />
//         </FormGroup>
//         <FormGroup>
//           <Label htmlFor="lastName">Last Name</Label>
//           <Input
//             id="lastName"
//             type="text"
//             onChange={(e) => setLastName(e.target.value)}
//           />
//         </FormGroup>
//         {/* User Role Dropdown */}
//         <FormGroup>
//           <Label htmlFor="userRole">Role</Label>
//           <Input
//             id="userRole"
//             type="select"
//             value={userRole}
//             onChange={(e) => setUserRole(e.target.value)}
//           >
//             <option value="" disabled>
//               Select Role
//             </option>
//             {userRolesList.map((role) => (
//               <option key={role.id} value={role.id}>
//                 {role.name}
//               </option>
//             ))}
//           </Input>
//         </FormGroup>
//         <FormGroup>
//           <Label htmlFor="relationship">Relationship</Label>
//           <Input
//             id="relationship"
//             type="text"
//             onChange={(e) => setRelationship(e.target.value)}
//           />
//         </FormGroup>
//         {/* Link account to Kid User Dropdown */}
//         <FormGroup>
//           <Label htmlFor="childUserId">Link Account to Kid User</Label>
//           <Input
//             id="childUserId"
//             type="select"
//             value={childUserId}
//             onChange={(e) => setChildUserId(e.target.value)}
//           >
//             <option value="" disabled>
//               Select Kid User
//             </option>
//             {childUsersList.map((kidUser) => (
//               <option key={kidUser.id} value={kidUser.id}>
//                 {kidUser.name}
//               </option>
//             ))}
//           </Input>
//         </FormGroup>
//         <FormGroup>
//           <Label for="email">Email</Label>
//           <Input
//             id="email"
//             type="text"
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </FormGroup>
//         <FormGroup>
//           <Label for="password">Password</Label>
//           <Input
//             id="password"
//             type="password"
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </FormGroup>
//         <FormGroup>
//           <Label for="confirmPassword">Confirm Password</Label>
//           <Input
//             id="confirmPassword"
//             type="password"
//             onChange={(e) => setConfirmPassword(e.target.value)}
//           />
//         </FormGroup>
//         <FormGroup>
//           <Button>Register</Button>
//         </FormGroup>
//       </fieldset>
//     </Form>
//   );
// }

