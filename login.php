<?php
/**
 * Login template
 * Shows error if username and/or password is wrong
 */
defined('INCLUDED') or die();
?>
<link rel="stylesheet" href="<?php echo get_url('/css/login.css'); ?>"/>
<div class="wrap">
  <form class="login" action="index.php" method="post">
    <div class="toggle-bar">
      <div class="toggle-login active">
        <span>NOVA MODA</span>
      </div>
    </div>
    <div class="login-body">
      <div class="input-section">
        <input name="username" class="user-input" type="text" placeholder="Username">
      </div>
      <div class="input-section">
        <input name="password" class="user-input" type="password" placeholder="Password">
      </div>
      <input type="submit" class="btn fade-effect-btn" id="btn-login" value="Login"/>
        <p class="red-text"><?php echo $login_error; ?></p>
    </div>
  </form>
</div>