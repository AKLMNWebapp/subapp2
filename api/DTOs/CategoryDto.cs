using System.ComponentModel.DataAnnotations;

namespace mvc.DTOs;

public class CategoryDto 

{
    public int CategoryId {get; set;}

    [RegularExpression(@"[a-zA-ZæøåÆØÅ, \-]{2,30}", ErrorMessage = "The name must be numbers of letters between 2 to 30 characters.")]
    [Display(Name = "Category name")]
    public string Name {get; set;} = string.Empty;

}