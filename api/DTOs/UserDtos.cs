using System;
using System.ComponentModel.DataAnnotations;

namespace mvc.DTOs;

public class UserDTO

{
    public string UserId {get; set;} = string.Empty;
    public string Email {get; set;} = string.Empty;
    public string Role {get; set;} = string.Empty;

}