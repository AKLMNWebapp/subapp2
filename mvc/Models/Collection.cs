using System;
namespace mvc.Models;

public class Collection {
    public int CollectionId {get; set;}
    public int UserId {get; set;}
    public virtual User User { get; set; } = default!; //navigation property
    public virtual List<Product> Product {get; set; } = default!; //navigation property
    public DateTime? CreatedAt {get; set;}
}