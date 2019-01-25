<?php function temp_table($country, $rows = 10) { ?>
<table class="temp-table <?php echo $country ?>">
    <tr1>
        <th>Nr.</th>
        <th>Place</th>
        <th>Temp</th>
    </tr1>
    <?php for ($i = 0; $i < $rows; $i++) { ?>
    <tr>
        <td><?php echo $i+1; ?></td>
        <td>bladiebladiebladiebla</td>
        <td></td>
    </tr>
    <?php } ?>

</table>
<?php } ?>

