<?php
/**
 * Created by PhpStorm.
 * User: Anne Marijke
 * Date: 15-1-2019
 * Time: 20:47
 */
?>
<div class="wrap">
  <form class="login" action="index.php" method="post">
    <div class="toggle-bar">
      <div class="toggle-login active">
        <span>Login</span>
      </div>
    </div>
    <div class="login-body">
      <div class="input-section">
        <input name="username" class="user-input" type="text" placeholder="Username">
      </div>
      <div class="input-section">
        <input name="password" class="user-input" type="password" placeholder="Password">
      </div>
      <input type="submit" class="btn" id="btn-login" value="Login"/>
        <p class="red-text"><?php echo $login_error; ?></p>
    </div>
  </form>
</div>