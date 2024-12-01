using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using mvc.DAL.Models;
using mvc.DTOs;

namespace mvc.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AccountAPIController : Controller
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;
    private readonly ILogger<ProductController> _logger;

    public AccountAPIController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, ILogger<ProductController> logger )
    {
        _logger = logger;
        _userManager = userManager;
        _signInManager = signInManager;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(Login model)
    {
        var user = await _userManager.FindByEmailAsync(model.Email);
        if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
        {
            await _signInManager.SignInAsync(user, isPersistent: false);
            var userInfo = new UserDTO
            {
            UserId = user.Id,
            Email = user.Email,
            Role = (await _userManager.GetRolesAsync(user)).FirstOrDefault() ?? string.Empty
            };
            return Ok(userInfo);
        }
        else return Unauthorized();

    }

    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        await _signInManager.SignOutAsync();
        return Ok(); // user is logged out
    }

    [HttpGet("checkAuth")]
    public async Task<IActionResult> CheckAuth()
    {
        var user = await _userManager.GetUserAsync(User);
        if (user == null)
        {
            return Unauthorized(); // User is not logged in
        }

        // Return user details, such as email and role
            var userInfo = new UserDTO
            {
            UserId = user.Id,
            Email = user.Email,
            Role = (await _userManager.GetRolesAsync(user)).FirstOrDefault() ?? string.Empty
            };

        return Ok(userInfo);
    }

}