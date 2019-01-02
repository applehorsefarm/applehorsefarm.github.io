<html>
<head>
	<style>
	.error {color: #FF6464;}
	</style>
</head>
<body>  
	<?php
	// define variables and set to empty values
	$nameErr = $emailErr = "";
	$name = $email = $message = "";

	if ($_POST){
		if ($_SERVER["REQUEST_METHOD"] == "POST") {
			if (empty($_POST["name"])) {
				$nameErr = "Name is required.";
				?>
				<script>alert("Name is required.");</script>
				<?php
			} else {
				$name = htmlspecialchars($_POST["name"]);
    // check if name only contains letters and whitespace
				if (!preg_match("/^[a-zA-Z ]*$/",$name)) {
					$nameErr = "Only letters and white space allowed for name."; 
					?>
					<script>alert("Only letters and white space allowed for name.");</script>
					<?php
				}
			}
			echo $nameErr;

			if (empty($_POST["email"])) {
				$emailErr = "E-mail is required.";
				?>
				<script>alert("E-mail is required.");</script>
				<?php
			} else {
				$email = htmlspecialchars($_POST["email"]);
    // check if e-mail address is well-formed
				if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
					$emailErr = "Invalid e-mail format.";
					?>
					<script>alert("Invalid e-mail format.");</script>
					<?php
				}
			}

			if (empty($_POST["message"])) {
				$message = "";
			} else {
				$message = htmlspecialchars($_POST["message"]);
			}
		}
		if ($nameErr == "" and $emailErr == "") {
			$to = "applehorsefarm@gmail.com";
			$subj = "applehorsefarm: " . $_POST['name'];
			$txt = $_POST['message'];
			$headers = "From: applehorsefarm" . "\r\n" . "CC: " . $_POST['email'];

			mail($to,$subj,$txt,$headers);
			?>
			<script>alert("Your message has been sent!");</script>
			<?php
		}
	}
	?>
</body>
</html>